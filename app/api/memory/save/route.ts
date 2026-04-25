import { NextResponse } from "next/server";
import { prisma } from "@/src/core/db/client";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await req.json();

    if (!content) {
      return NextResponse.json(
        { error: "Missing content" },
        { status: 400 }
      );
    }

    const memory = await prisma.memory.create({
      data: {
        userId: user.id,
        content,
      },
    });

    return NextResponse.json({ memory });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to save memory" },
      { status: 500 }
    );
  }
}
