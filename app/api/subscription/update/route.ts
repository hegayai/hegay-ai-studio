import { NextResponse } from "next/server";
import { prisma } from "@/src/core/db/client";

export async function POST(req: Request) {
  try {
    const { userId, planId, status } = await req.json();

    if (!userId || !planId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Upsert the user's subscription
    const updated = await prisma.userSubscription.upsert({
      where: { userId },
      update: {
        planId,
        active: status ?? true,
      },
      create: {
        userId,
        planId,
        active: status ?? true,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });

    return NextResponse.json({
      success: true,
      subscription: updated,
    });
  } catch (error) {
    console.error("Subscription Update Error:", error);
    return NextResponse.json(
      { error: "Failed to update subscription" },
      { status: 500 }
    );
  }
}
