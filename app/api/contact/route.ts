import { NextResponse } from "next/server";

const TARGET_URL = process.env.CONTACT_TARGET_URL!;
const USER = process.env.CONTACT_BASIC_USER!;
const PASSWORD = process.env.CONTACT_BASIC_PASSWORD!;

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (!TARGET_URL || !USER || !PASSWORD) {
      return NextResponse.json(
        {
          error:
            "Missing env: CONTACT_TARGET_URL, CONTACT_BASIC_USER, CONTACT_BASIC_PASSWORD",
        },
        { status: 500 }
      );
    }

    const formData = await request.formData();

    const basicToken = Buffer.from(`${USER}:${PASSWORD}`).toString("base64");

    const res = await fetch(TARGET_URL, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Basic ${basicToken}`,
      },
    });

    const contentType = res.headers.get("content-type") || "";
    const status = res.status;

    if (contentType.includes("application/json")) {
      const json = await res.json();
      return NextResponse.json(json, { status });
    }

    const text = await res.text();
    return new NextResponse(text, {
      status,
      headers: { "content-type": contentType || "text/plain" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
