export type PlanId = "free" | "starter" | "pro" | "creator" | "admin";

export const PLAN_LIMITS: Record<
  PlanId,
  {
    maxImagesPerDay: number;
    maxVideosPerDay: number;
    maxVideoSeconds: number;
  }
> = {
  free: {
    maxImagesPerDay: 0,
    maxVideosPerDay: 0,
    maxVideoSeconds: 0,
  },
  starter: {
    maxImagesPerDay: 10,
    maxVideosPerDay: 2,
    maxVideoSeconds: 6,
  },
  pro: {
    maxImagesPerDay: 25,
    maxVideosPerDay: 3,
    maxVideoSeconds: 10,
  },
  creator: {
    maxImagesPerDay: 50,
    maxVideosPerDay: 5,
    maxVideoSeconds: 15,
  },
  admin: {
    maxImagesPerDay: 9999,
    maxVideosPerDay: 9999,
    maxVideoSeconds: 120,
  },
};
