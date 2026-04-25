import { prisma } from "@/src/core/db/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { PLAN_LIMITS, PlanId } from "@/src/config/plans";

const SECRET = process.env.AUTH_SECRET || "default_secret_key";

// ------------------------------------------------------
// COOKIE SESSION AUTH (Dashboard)
// ------------------------------------------------------
export function createSession(userId: string) {
  const token = jwt.sign({ userId }, SECRET, { expiresIn: "7d" });

  cookies().set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return token;
}

export async function getCurrentUserFromCookie() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) return null;

    const decoded = jwt.verify(token, SECRET) as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    return user || null;
  } catch {
    return null;
  }
}

export function clearSession() {
  cookies().set("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });
}

// ------------------------------------------------------
// BEARER TOKEN AUTH (API Routes)
// ------------------------------------------------------
export async function getCurrentUser(req: Request) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth) return null;

    const token = auth.replace("Bearer ", "").trim();
    if (!token) return null;

    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!session) return null;
    if (session.expiresAt < new Date()) return null;

    return session.user;
  } catch {
    return null;
  }
}

// ------------------------------------------------------
// USAGE: GET TODAY'S USAGE ROW (OR CREATE IT)
// ------------------------------------------------------
export async function getTodayUsage(userId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let usage = await prisma.usage.findFirst({
    where: { userId, date: today },
  });

  if (!usage) {
    usage = await prisma.usage.create({
      data: {
        userId,
        date: today,
        imagesUsed: 0,
        videosUsed: 0,
      },
    });
  }

  return usage;
}

// ------------------------------------------------------
// LIMIT CHECKS
// ------------------------------------------------------
export function canGenerateImage(
  planId: PlanId,
  usage: { imagesUsed: number }
) {
  const limits = PLAN_LIMITS[planId];
  return usage.imagesUsed < limits.maxImagesPerDay;
}

export function canGenerateVideo(
  planId: PlanId,
  usage: { videosUsed: number }
) {
  const limits = PLAN_LIMITS[planId];
  return usage.videosUsed < limits.maxVideosPerDay;
}

export function validateVideoDuration(
  planId: PlanId,
  requestedSeconds: number
) {
  const limits = PLAN_LIMITS[planId];
  return requestedSeconds <= limits.maxVideoSeconds;
}
