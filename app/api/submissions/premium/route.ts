// app/api/submissions/premium/route.ts
import { NextRequest, NextResponse } from "next/server";
import directus from "@/lib/directus";
import { createItem } from "@directus/sdk";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { producer_name, contact_name, email, message } = body;

    // Validate required fields
    if (!producer_name || !contact_name || !email) {
      return NextResponse.json(
        { error: "Campi obbligatori mancanti" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Formato email non valido" },
        { status: 400 }
      );
    }

    // Create premium inquiry in Directus
    const inquiry = await directus.request(
      createItem("premium_inquiries", {
        producer_name,
        contact_name,
        email,
        message: message || null,
        status: "pending",
        submitted_at: new Date().toISOString(),
      })
    );

    return NextResponse.json(
      {
        success: true,
        message: "Richiesta premium inviata con successo",
        data: inquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Premium inquiry error:", error);
    return NextResponse.json(
      { error: "Errore interno del server" },
      { status: 500 }
    );
  }
}
