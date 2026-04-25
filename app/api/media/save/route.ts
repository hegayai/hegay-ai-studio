import { NextResponse } from "next/server";
import { prisma } from "@/src/core/db/client";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { url, type } = await req.json();

    if (!url || !type) {
      return NextResponse.json(
        { error: "Missing url or type" },
        { status: 400 }
      );
    }

    const media = await prisma.media.create({
      data: {
        userId: user.id,
        url,
        type,
      },
    });

    return NextResponse.json({ media });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to save media" },
      { status: 500 }
    );
  }
}
