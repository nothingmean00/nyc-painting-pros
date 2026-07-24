"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowRight, Brush, LoaderCircle, Send, ShieldCheck, X } from "lucide-react";
import { track } from "@vercel/analytics";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";

const prompts = ["Apartment repaint", "Cabinet refinishing", "Wall repair", "Commercial space"];

function messageText(message: ReturnType<typeof useChat>["messages"][number]) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function PaintingScopeChat({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const busy = status === "submitted" || status === "streaming";
  const userMessages = messages.filter((message) => message.role === "user");
  const estimateHref = useMemo(() => {
    const transcript = messages
      .map((message) => `${message.role === "user" ? "Customer" : "Assistant"}: ${messageText(message)}`)
      .join("\n")
      .slice(-1400);
    return `/contact?projectBrief=${encodeURIComponent(`Painting Project Assistant notes:\n${transcript}`)}`;
  }, [messages]);

  function send(text: string) {
    const value = text.trim();
    if (!value || busy) return;
    track("painting_assistant_message", { messageNumber: userMessages.length + 1 });
    sendMessage({ text: value });
    setInput("");
  }

  return (
    <section
      role="dialog"
      aria-label="Painting Project Assistant"
      className="fixed inset-x-3 bottom-20 z-50 flex h-[min(620px,calc(100dvh-7rem))] flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-2xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[410px]"
    >
      <header className="flex items-center justify-between bg-[var(--color-ink)] px-4 py-3 text-white">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-green)]/20">
            <Brush className="h-5 w-5 text-[var(--color-green-300)]" />
          </span>
          <div>
            <h2 className="font-semibold">Painting Project Assistant</h2>
            <p className="text-xs text-white/65">Build a project brief, not a quote</p>
          </div>
        </div>
        <button type="button" onClick={onClose} className="grid h-11 w-11 place-items-center rounded-xl hover:bg-white/10" aria-label="Close Painting Project Assistant">
          <X className="h-5 w-5" />
        </button>
      </header>

      <Conversation className="min-h-0 bg-white">
        <ConversationContent className="gap-4 p-4">
          <Message from="assistant">
            <MessageContent className="rounded-xl bg-[var(--color-cream)] p-3 text-[var(--color-ink)]">
              Tell me what you want painted. I&apos;ll help capture the surfaces, condition, access, and timing a project manager needs to assess the job.
            </MessageContent>
          </Message>
          {messages.map((message) => (
            <Message from={message.role} key={message.id}>
              <MessageContent className={message.role === "user" ? "bg-[var(--color-green-600)] text-white" : "rounded-xl bg-[var(--color-cream)] p-3 text-[var(--color-ink)]"}>
                {message.parts.map((part, index) =>
                  part.type === "text" ? (
                    message.role === "assistant" ? (
                      <MessageResponse key={`${message.id}-${index}`}>{part.text}</MessageResponse>
                    ) : (
                      <p className="leading-relaxed" key={`${message.id}-${index}`}>{part.text}</p>
                    )
                  ) : null,
                )}
              </MessageContent>
            </Message>
          ))}
          {status === "submitted" && (
            <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]" role="status">
              <LoaderCircle className="h-4 w-4 animate-spin" /> Preparing the next question…
            </div>
          )}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              The assistant is temporarily unavailable. Use the <Link href="/contact" className="font-semibold underline">estimate form</Link>.
            </div>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t border-[var(--color-line)] bg-white p-3">
        {messages.length === 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {prompts.map((prompt) => (
              <button key={prompt} type="button" onClick={() => send(`I need help planning this project: ${prompt}.`)} className="min-h-10 rounded-full border border-[var(--color-line)] px-3 text-sm font-medium hover:border-[var(--color-green)]">
                {prompt}
              </button>
            ))}
          </div>
        )}
        {userMessages.length >= 2 && !busy && (
          <Link href={estimateHref} onClick={() => track("painting_assistant_estimate_handoff", { messages: userMessages.length })} className="mb-3 flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--color-green)] px-4 text-sm font-semibold text-white hover:bg-[var(--color-green-600)]">
            Build my estimate request <ArrowRight className="h-4 w-4" />
          </Link>
        )}
        <form className="flex gap-2" onSubmit={(event) => { event.preventDefault(); send(input); }}>
          <label className="sr-only" htmlFor="painting-assistant-input">Message the Painting Project Assistant</label>
          <textarea id="painting-assistant-input" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); send(input); } }} rows={1} maxLength={1200} placeholder="Describe the rooms, surfaces, or condition…" className="min-h-11 max-h-24 flex-1 resize-none rounded-xl border border-[var(--color-line)] px-3 py-2.5 text-base outline-none focus:border-[var(--color-green)]" />
          <button type={busy ? "button" : "submit"} onClick={busy ? stop : undefined} disabled={!busy && !input.trim()} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--color-green)] text-white disabled:opacity-40" aria-label={busy ? "Stop response" : "Send message"}>
            {busy ? <X className="h-4 w-4" /> : <Send className="h-4 w-4" />}
          </button>
        </form>
        <p className="mt-2 flex items-start gap-1.5 text-[11px] leading-relaxed text-[var(--color-muted)]">
          <ShieldCheck className="mt-0.5 h-3 w-3 shrink-0" /> Don&apos;t enter payment details, precise apartment numbers, or sensitive information.
        </p>
      </div>
    </section>
  );
}
