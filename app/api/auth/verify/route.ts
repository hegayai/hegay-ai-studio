import { NextResponse } from "next/server";
import { prisma } from "@/src/core/db/client";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Missing email" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    return NextResponse.json({
      exists: !!user,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Verification failed" },
      { status: 500 }
    );
  }
}
