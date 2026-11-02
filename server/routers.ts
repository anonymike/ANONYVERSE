import { getSessionCookieName, getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { providerCatalog } from "../lib/catalog";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => { const cookieOptions = getSessionCookieOptions(ctx.req); ctx.res.clearCookie(getSessionCookieName(ctx.req), { ...cookieOptions, maxAge: -1 }); return { success: true } as const; }),
  }),
  providers: router({
    inventory: publicProcedure.query(() => providerCatalog.map(({ id, category, name, status, auth, environment, approval, docs }) => ({ id, category, name, status, auth, environment, approval, docs }))),
    policy: publicProcedure.query(() => ({ credentials: "server_only", activation: "approved_and_configured", source: "demo_fallback" as const })),
  }),
});
export type AppRouter = typeof appRouter;
