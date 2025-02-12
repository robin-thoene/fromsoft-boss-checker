import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * The health endpoint.
 */
export async function GET() {
  return NextResponse.json({ message: "healthy" }, { status: 200 });
}
