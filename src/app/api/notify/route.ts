import { notifyTgUserId } from "@/app/actions/notifyTgUserId";
import { appDataSchema } from "@/lib/schemas/appDataSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const verificationResult = appDataSchema.safeParse(body);
  if (verificationResult.error) {
    const errorStr = verificationResult.error.errors.reduce(
      (temp, next) =>
        `${temp} ${next.path.toString().toUpperCase()} - ${next.message};`,
      ""
    );
    return NextResponse.json(
      { error: `Fields verification failed: ${errorStr}` },
      { status: 400 }
    );
  }

  try {
    await notifyTgUserId(verificationResult.data);
    return NextResponse.json({}, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: `Failed why sending notification to telegram` },
      { status: 500 }
    );
  }
}
