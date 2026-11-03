import { z } from "zod";
import { getSessionCookieName, getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { providerCatalog } from "../lib/catalog";
import { approvedReleases } from "../packages/shared/src/index";
import { getProviderByKey, listApprovedReleases, listMobileReleases, listProviders, recordAdminAudit, recordProviderHealth, upsertMobileRelease, upsertProvider } from "./db";

const providerInput = z.object({
  providerKey: z.string().min(2).max(80),
  name: z.string().min(2).max(180),
  category: z.enum(["movies_tv", "anime", "sports", "music", "news", "culture"]),
  docsUrl: z.string().url().optional(),
  baseUrl: z.string().url().optional(),
  authType: z.string().max(64).optional(),
  environment: z.enum(["development", "test", "production"]),
  credentialRef: z.string().regex(/^[A-Z][A-Z0-9_]{1,127}$/).optional(),
  subscriptionInfo: z.string().max(1000).optional(),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => { const cookieOptions = getSessionCookieOptions(ctx.req); ctx.res.clearCookie(getSessionCookieName(ctx.req), { ...cookieOptions, maxAge: -1 }); return { success: true } as const; }),
  }),
  providers: router({
    inventory: publicProcedure.query(() => providerCatalog.map(({ id, category, name, status, auth, environment, approval, docs }) => ({ id, category, name, status, auth, environment, approval, docs }))),
    policy: publicProcedure.query(() => ({ credentials: "server_only", activation: "approved_and_configured", source: "demo_fallback" as const })),
    adminInventory: adminProcedure.query(async () => listProviders()),
    upsertMetadata: adminProcedure.input(providerInput).mutation(async ({ input, ctx }) => {
      const saved = await upsertProvider({ ...input, enabled: false, approvalStatus: "pending", setupStatus: "not_configured" });
      await recordAdminAudit(ctx.user.id, "provider.metadata_upserted", saved?.id, { providerKey: input.providerKey });
      return saved;
    }),
    testConnection: adminProcedure.input(z.object({ providerKey: z.string().min(2) })).mutation(async ({ input, ctx }) => {
      const provider = await getProviderByKey(input.providerKey);
      if (!provider) throw new Error("Provider is not configured");
      const isDemo = provider.providerKey === "demo-catalog";
      const secretAvailable = isDemo || Boolean(provider.credentialRef && process.env[provider.credentialRef]);
      const ok = secretAvailable;
      const message = isDemo ? "Demo provider is available without an external credential." : ok ? "Protected credential reference is present for the server runtime." : "The referenced Manus secret is not available in this environment.";
      await recordProviderHealth(provider.id, ok, message);
      if (ok) await upsertProvider({ ...provider, setupStatus: "tested", updatedAt: new Date() });
      await recordAdminAudit(ctx.user.id, "provider.connection_tested", provider.id, { ok });
      return { ok, message };
    }),
    setActivation: adminProcedure.input(z.object({ providerKey: z.string().min(2), approved: z.boolean(), enabled: z.boolean() })).mutation(async ({ input, ctx }) => {
      const provider = await getProviderByKey(input.providerKey);
      if (!provider) throw new Error("Provider is not configured");
      const canActivate = provider.providerKey === "demo-catalog" || (provider.setupStatus === "tested" || provider.setupStatus === "active") && Boolean(provider.credentialRef);
      if (input.enabled && (!input.approved || !canActivate)) throw new Error("Provider must be tested, credentialed and approved before activation");
      const saved = await upsertProvider({ ...provider, approvalStatus: input.approved ? "approved" : "pending", enabled: input.enabled, setupStatus: input.enabled ? "active" : provider.setupStatus, updatedAt: new Date() });
      await recordAdminAudit(ctx.user.id, input.enabled ? "provider.activated" : "provider.deactivated", provider.id, { approved: input.approved });
      return saved;
    }),
  }),
  releases: router({
    approved: publicProcedure.query(async () => {
      const records = await listApprovedReleases();
      return records.length ? records : approvedReleases;
    }),
    adminList: adminProcedure.query(() => listMobileReleases()),
    adminCreate: adminProcedure.input(z.object({ version: z.string().min(1).max(32), platform: z.enum(["android", "ios"]), downloadUrl: z.string().url().refine((value) => value.startsWith("https://"), "HTTPS download URLs are required"), releaseNotes: z.array(z.string().min(1)).min(1), minimumRequirement: z.string().max(180).optional(), sha256: z.string().max(128).optional(), approve: z.boolean().default(false) })).mutation(async ({ input, ctx }) => {
      const created = await upsertMobileRelease({ ...input, status: input.approve ? "approved" : "draft", publishedAt: input.approve ? new Date() : null, releaseNotes: input.releaseNotes });
      await recordAdminAudit(ctx.user.id, "release.created", undefined, { version: input.version, platform: input.platform, approved: input.approve });
      return created;
    }),
  }),
});
export type AppRouter = typeof appRouter;
