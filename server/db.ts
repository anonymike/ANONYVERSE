import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, InsertMobileRelease, MobileRelease, adminAuditEvents, mobileReleases, providers, providerHealthChecks, users } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch {
      console.warn("[Database] Failed to connect");
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user");
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

export async function listProviders() {
  const db = await getDb();
  return db ? db.select().from(providers).orderBy(providers.category, providers.name) : [];
}

export async function getProviderByKey(providerKey: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(providers).where(eq(providers.providerKey, providerKey)).limit(1);
  return result[0];
}

export async function upsertProvider(input: typeof providers.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(providers).values(input).onDuplicateKeyUpdate({
    set: {
      name: input.name,
      category: input.category,
      docsUrl: input.docsUrl,
      baseUrl: input.baseUrl,
      authType: input.authType,
      environment: input.environment,
      credentialRef: input.credentialRef,
      subscriptionInfo: input.subscriptionInfo,
      setupStatus: input.setupStatus,
      approvalStatus: input.approvalStatus,
      enabled: input.enabled,
      updatedAt: new Date(),
    },
  });
  return getProviderByKey(input.providerKey);
}

export async function recordProviderHealth(providerId: number, ok: boolean, message: string) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(providerHealthChecks).values({ providerId, ok, message });
}

export async function recordAdminAudit(actorUserId: number, action: string, providerId?: number, metadata?: Record<string, unknown>) {
  const db = await getDb();
  if (!db) return;
  await db.insert(adminAuditEvents).values({ actorUserId, action, providerId, metadata });
}

export async function listApprovedReleases(): Promise<MobileRelease[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(mobileReleases).where(eq(mobileReleases.status, "approved")).orderBy(desc(mobileReleases.publishedAt));
}

export async function listMobileReleases(): Promise<MobileRelease[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(mobileReleases).orderBy(desc(mobileReleases.createdAt));
}

export async function upsertMobileRelease(input: InsertMobileRelease) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  return db.insert(mobileReleases).values(input);
}
