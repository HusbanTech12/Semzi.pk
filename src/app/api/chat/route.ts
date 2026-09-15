import { NextResponse } from "next/server";
import OpenAI from "openai";
import { buildSemziSystemPrompt, type ChatMessage } from "@/lib/chat";

export const runtime = "nodejs";

const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 2000;

function getClient() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured");
  }

  return new OpenAI({
    apiKey,
    baseURL: process.env.GROQ_BASE_URL ?? "https://api.groq.com/openai/v1",
  });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { messages?: ChatMessage[] };
    const incoming = Array.isArray(body.messages) ? body.messages : [];

    const messages = incoming
      .filter(
        (m): m is ChatMessage =>
          !!m &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string" &&
          m.content.trim().length > 0
      )
      .slice(-MAX_MESSAGES)
      .map((m) => ({
        role: m.role,
        content: m.content.trim().slice(0, MAX_CONTENT_LENGTH),
      }));

    if (messages.length === 0) {
      return NextResponse.json(
        { error: "Please send a message to continue." },
        { status: 400 }
      );
    }

    const client = getClient();
    const model = process.env.GROQ_MODEL ?? "qwen/qwen3.8-27b";

    const completion = await client.chat.completions.create({
      model,
      temperature: 0.6,
      max_tokens: 500,
      messages: [
        { role: "system", content: buildSemziSystemPrompt() },
        ...messages,
      ],
    });

    const choice = completion.choices[0]?.message;
    const reply =
      choice?.content?.trim() ||
      "Sorry — I could not generate a reply just now. Please try again.";

    return NextResponse.json({ reply });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Chat request failed";
    const missingKey = message.includes("GROQ_API_KEY");
    return NextResponse.json(
      {
        error: missingKey
          ? "Chat is not configured yet. Add GROQ_API_KEY to enable the Semzi assistant."
          : "Something went wrong. Please try again in a moment.",
      },
      { status: missingKey ? 503 : 500 }
    );
  }
}
