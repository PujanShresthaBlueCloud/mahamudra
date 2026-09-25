import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { createContactMessage } from "@/server/services/contact.service";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    const contactMessage = await createContactMessage(parsed.data);
    return NextResponse.json({ contactMessage }, { status: 201 });
  } catch (err) {
    console.error("Failed to save contact message:", err);
    return NextResponse.json({ error: "Could not send your message." }, { status: 500 });
  }
}
