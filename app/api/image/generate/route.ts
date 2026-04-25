import { NextResponse } from "next/server";
import {
  getCurrentUser,
  getTodayUsage,
  canGenerateImage,
} from "@/lib/auth";
import { prisma } from "@/src/core/db/client";

const FAL_KEY = process.env.FAL_KEY;

export async function POST(req: Request) {
  try {
    if (!FAL_KEY) {
      return NextResponse.json({ error: "Missing FAL_KEY" }, { status: 500 });
    }

    const user = await getCurrentUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const usage = await getTodayUsage(user.id);
    if (!canGenerateImage(user.planId as any, usage)) {
      return NextResponse.json(
        { error: "Image limit reached for today" },
        { status: 429 }
      );
    }

    const response = await fetch("https://fal.run/fal-ai/flux-pro", {
      method: "POST",
      headers: {
        Authorization: `Key ${FAL_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const result = await response.json();

    if (!response.ok || !result.images?.[0]?.url) {
      return NextResponse.json(
        { error: "Fal.ai generation failed", raw: result },
        { status: 500 }
      );
    }

    const imageUrl = result.images[0].url;

    // ⭐ FIXED: Removed invalid "title" field
    await prisma.media.create({
      data: {
        userId: user.id,
        type: "image",
        url: imageUrl,
        prompt, // valid field in your Prisma schema
      },
    });

    await prisma.usage.update({
      where: { id: usage.id },
      data: { imagesUsed: usage.imagesUsed + 1 },
    });

    return NextResponse.json({
      success: true,
      url: imageUrl,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Fal.ai image generation error",
        details: String(error),
      },
      { status: 500 }
    );
  }
}
