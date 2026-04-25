import { NextResponse } from "next/server";
import { prisma } from "@/src/core/db/client";
import { hegayRouter } from "@/src/core/hegay-router";

export async function POST(req: Request) {
  try {
    const { userId, message, threadId } = await req.json();

    const reply = await hegayRouter(message);

    // Save user message
    await prisma.message.create({
      data: {
        threadId,
        role: "user",
        content: message,
      },
    });

    // Save assistant reply
    const saved = await prisma.message.create({
      data: {
        threadId,
        role: "assistant",
        content: reply,
      },
    });

    return NextResponse.json({
      success: true,
      reply,
      saved,
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { success: false, error: "Chat processing failed" },
      { status: 500 }
    );
  }
}
