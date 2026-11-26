import "server-only";

import { PDFDocument, StandardFonts, rgb, type PDFFont } from "pdf-lib";
import type { QuoteDocument } from "./automatic-estimate";
import { formatQuoteTotal } from "./lead-sales";
import { site } from "./site";

function linesFor(text: string, font: PDFFont, size: number, width: number) {
  const supported = new Set(font.getCharacterSet());
  const plain = text.replace(/\r\n?/g, "\n").replace(/[–—]/g, "-").replace(/\t/g, " ");
  const clean = Array.from(plain, (character) => {
    if (character === "\n" || supported.has(character.codePointAt(0)!)) return character;
    const fallback = character.normalize("NFKD").replace(/\p{M}/gu, "");
    return fallback && Array.from(fallback).every((letter) => supported.has(letter.codePointAt(0)!)) ? fallback : "?";
  }).join("");
  return clean.split(/\r?\n/).flatMap((paragraph) => {
    const lines: string[] = [];
    let line = "";
    for (const word of paragraph.trim().split(/\s+/)) {
      const candidate = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) <= width) {
        line = candidate;
        continue;
      }
      if (line) lines.push(line);
      line = "";
      for (const character of word) {
        if (font.widthOfTextAtSize(line + character, size) > width) {
          lines.push(line);
          line = "";
        }
        line += character;
      }
    }
    return [...lines, line];
  });
}

export async function createQuotePdf(quote: QuoteDocument, customer: {
  name: string; location: string; id: string; createdAt: string;
}) {
  const document = await PDFDocument.create();
  const regular = await document.embedFont(StandardFonts.Helvetica);
  const bold = await document.embedFont(StandardFonts.HelveticaBold);
  const ink = rgb(0.12, 0.22, 0.30);
  const muted = rgb(0.30, 0.36, 0.40);
  const lineColor = rgb(0.86, 0.88, 0.89);
  const accent = rgb(0.86, 0.36, 0.13);
  const reference = customer.id.slice(0, 8).toUpperCase();
  const date = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", dateStyle: "medium" })
    .format(new Date(customer.createdAt));
  const width = 612;
  const height = 792;
  const margin = 52;
  document.setTitle(`NYC Painting Pros estimate ${reference}`);
  document.setAuthor(site.name);
  document.setCreationDate(new Date(customer.createdAt));
  let page = document.addPage([width, height]);
  let y = 0;

  function header(first: boolean) {
    page.drawRectangle({ x: margin, y: 736, width: 25, height: 4, color: accent });
    page.drawText(site.name, { x: margin, y: 714, size: 12, font: bold, color: ink });
    page.drawText(first ? "Painting estimate" : "Painting estimate / continued", {
      x: margin, y: 674, size: first ? 31 : 22, font: bold, color: ink,
    });
    page.drawText(`${reference}  |  ${date}`, { x: margin, y: 651, size: 10, font: regular, color: muted });
    y = 622;
  }

  function roomFor(points: number) {
    if (y - points >= 76) return;
    page = document.addPage([width, height]);
    header(false);
  }

  function section(title: string, value: string) {
    roomFor(54);
    page.drawText(title, { x: margin, y, size: 13, font: bold, color: ink });
    y -= 22;
    for (const line of linesFor(value, regular, 11, width - 2 * margin)) {
      roomFor(15);
      if (line) page.drawText(line, { x: margin, y, size: 11, font: regular, color: ink });
      y -= line ? 16 : 8;
    }
    y -= 20;
  }

  header(true);
  section("Prepared for", [customer.name.slice(0, 150), customer.location.slice(0, 150)].filter(Boolean).join("\n"));
  roomFor(80);
  page.drawRectangle({ x: margin, y: y - 49, width: width - 2 * margin, height: 62, color: rgb(0.93, 0.95, 0.96) });
  page.drawText("Estimate amount", { x: margin + 15, y: y - 9, size: 10, font: regular, color: muted });
  page.drawText(formatQuoteTotal(quote.totalCents), { x: margin + 15, y: y - 34, size: 23, font: bold, color: ink });
  y -= 78;
  section("Scope of work", quote.scope);
  if (quote.timing) section("Timing and conditions", quote.timing);
  section("Next step", "Reply to your estimate email to discuss the scope or move forward. We’ll confirm the agreement and scheduling before work begins.");

  const pages = document.getPages();
  pages.forEach((item, index) => {
    item.drawLine({ start: { x: margin, y: 56 }, end: { x: width - margin, y: 56 }, thickness: 0.6, color: lineColor });
    item.drawText(`${site.email}  |  ${site.phone}`, { x: margin, y: 38, size: 9, font: regular, color: muted });
    item.drawText(`${index + 1} / ${pages.length}`, { x: width - margin - 23, y: 38, size: 9, font: regular, color: muted });
  });
  return document.saveAsBase64();
}
