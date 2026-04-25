import { NextResponse } from "next/server";
import { prisma } from "@/src/core/db/client";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { plan, status } = await req.json();

    if (!plan || !status) {
      return NextResponse.json(
        { error: "Missing subscription plan or status" },
        { status: 400 }
      );
    }

    const updated = await prisma.subscription.upsert({
      where: { userId: user.id },
      update: { plan, status },
      create: {
        userId: user.id,
        plan,
        status,
      },
    });

    return NextResponse.json({
      success: true,
      subscription: updated,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to update subscription" },
      { status: 500 }
    );
  }
}
