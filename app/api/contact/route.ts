// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import directus from "@/lib/directus";
import { createItem } from "@directus/sdk";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { full_name, email, subject, message } = body;

    // Validate required fields
    if (!full_name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Tutti i campi sono obbligatori" },
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

    // Validate field lengths
    if (full_name.length > 200) {
      return NextResponse.json(
        { error: "Nome e cognome troppo lungo (max 200 caratteri)" },
        { status: 400 }
      );
    }

    if (subject.length > 300) {
      return NextResponse.json(
        { error: "Oggetto troppo lungo (max 300 caratteri)" },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Messaggio troppo lungo (max 5000 caratteri)" },
        { status: 400 }
      );
    }

    // Create contact message in Directus
    try {
      const contactMessage = await directus.request(
        createItem("contact_messages", {
          full_name: full_name.trim(),
          email: email.trim().toLowerCase(),
          subject: subject.trim(),
          message: message.trim(),
          status: "pending",
          submitted_at: new Date().toISOString(),
        })
      );

      return NextResponse.json(
        {
          success: true,
          message: "Messaggio inviato con successo",
          data: contactMessage,
        },
        { status: 201 }
      );
    } catch (error) {
      console.error("Directus contact message error:", error);
      return NextResponse.json(
        { error: "Errore durante il salvataggio del messaggio" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Errore interno del server" },
      { status: 500 }
    );
  }
}
