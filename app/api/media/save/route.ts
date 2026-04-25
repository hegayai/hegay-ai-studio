import { NextResponse } from "next/server";
import { prisma } from "@/src/core/db/client";

export async function POST(req: Request) {
  try {
    const { userId, key, content } = await req.json();

    if (!userId || !key || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const saved = await prisma.memory.upsert({
      where: {
        userId_key: {
          userId,
          key,
        },
      },
      update: {
        content,
      },
      create: {
        userId,
        key,
        content,
      },
    });

    return NextResponse.json({
      success: true,
      memory: saved,
    });
  } catch (error) {
    console.error("Memory Save Error:", error);
    return NextResponse.json(
      { error: "Failed to save memory" },
      { status: 500 }
    );
  }
}
