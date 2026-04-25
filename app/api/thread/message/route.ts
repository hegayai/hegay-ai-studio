import { NextResponse } from "next/server";
import { prisma } from "@/src/core/db/client";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { threadId, content } = await req.json();

    if (!threadId || !content) {
      return NextResponse.json(
        { error: "Missing threadId or content" },
        { status: 400 }
      );
    }

    const message = await prisma.message.create({
      data: {
        threadId,
        userId: user.id,
        content,
      },
    });

    return NextResponse.json({ message });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to send message" },
      { status: 500 }
    );
  }
}
