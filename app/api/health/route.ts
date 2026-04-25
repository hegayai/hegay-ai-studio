import { NextResponse } from "next/server";
import { prisma } from "@/src/core/db/client";

export async function GET() {
  try {
    const start = Date.now();

    // Simple DB check
    await prisma.user.count();

    const duration = Date.now() - start;

    return NextResponse.json({
      status: "ok",
      database: "connected",
      responseTimeMs: duration,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        status: "error",
        message: err.message || "Health check failed",
      },
      { status: 500 }
    );
  }
}
