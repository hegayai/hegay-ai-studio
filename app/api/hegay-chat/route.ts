import { NextResponse } from "next/server";
import { prisma } from "@/src/core/db/client";
import { hegayRouter } from "@/lib/hegay-router";

export async function POST(req: Request) {
  try {
    const { userId, message } = await req.json();

    if (!userId || !message) {
      return NextResponse.json(
        { error: "Missing userId or message" },
        { status: 400 }
      );
    }

    // Process message through your custom router
    const reply = await hegayRouter.process(message);

    // Save chat message + reply
    const saved = await prisma.chat.create({
      data: {
        userId,
        message,
        reply,
      },
    });

    return NextResponse.json({
      success: true,
      chat: {
        id: saved.id,
        message: saved.message,
        reply: saved.reply,
        createdAt: saved.createdAt,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Chat processing failed" },
      { status: 500 }
    );
  }
}
