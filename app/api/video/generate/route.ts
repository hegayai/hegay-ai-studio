import { NextResponse } from "next/server";
import {
  getCurrentUser,
  getTodayUsage,
  canGenerateVideo,
  validateVideoDuration,
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

    const { prompt, seconds } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const duration = Number(seconds) || 6;

    if (!validateVideoDuration(user.planId as any, duration)) {
      return NextResponse.json(
        { error: "Video duration exceeds your plan limit" },
        { status: 403 }
      );
    }

    const usage = await getTodayUsage(user.id);
    if (!canGenerateVideo(user.planId as any, usage)) {
      return NextResponse.json(
        { error: "Video limit reached for today" },
        { status: 429 }
      );
    }

    const response = await fetch("https://fal.run/fal-ai/luma-dream-machine", {
      method: "POST",
      headers: {
        Authorization: `Key ${FAL_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        duration,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.video_url) {
      return NextResponse.json(
        { error: "Fal.ai video generation failed", raw: result },
        { status: 500 }
      );
    }

    await prisma.media.create({
      data: {
        userId: user.id,
        type: "video",
        url: result.video_url,
        title: prompt.slice(0, 120),
      },
    });

    await prisma.usage.update({
      where: { id: usage.id },
      data: { videosUsed: usage.videosUsed + 1 },
    });

    return NextResponse.json({
      success: true,
      url: result.video_url,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Fal.ai video generation error",
        details: String(error),
      },
      { status: 500 }
    );
  }
}
