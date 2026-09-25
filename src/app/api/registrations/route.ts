import { NextResponse } from "next/server";
import { registrationSchema } from "@/lib/validation";
import { createRegistration } from "@/server/services/registration.service";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = registrationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    const registration = await createRegistration(parsed.data);
    return NextResponse.json({ registration }, { status: 201 });
  } catch (err) {
    console.error("Failed to create registration:", err);
    return NextResponse.json({ error: "Could not save your registration." }, { status: 500 });
  }
}
