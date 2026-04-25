import { NextResponse } from "next/server";
import { prisma } from "@/src/core/db/client";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser(req);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { url, type, title } = await req.json();

    if (!url || !type) {
      return NextResponse.json(
        { error: "Missing media url or type" },
        { status: 400 }
      );
    }

    const saved = await prisma.media.create({
      data: {
        userId: user.id,
        url,
        type,
        title: title || "Untitled",
      },
    });

    return NextResponse.json({
      success: true,
      media: saved,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to save media" },
      { status: 500 }
    );
  }
}
