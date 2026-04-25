import { NextResponse } from "next/server";
import { prisma } from "@/src/core/db/client";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title } = await req.json();

    const thread = await prisma.thread.create({
      data: {
        userId: user.id,
        title: title || null,
      },
    });

    return NextResponse.json({
      success: true,
      thread,
    });
  } catch (error) {
    console.error("Thread Create Error:", error);
    return NextResponse.json(
      { error: "Failed to create thread" },
      { status: 500 }
    );
  }
}
