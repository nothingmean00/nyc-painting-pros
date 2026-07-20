export function conciseDescription(text: string, maxLength = 160) {
  if (text.length <= maxLength) return text;

  const candidate = text.slice(0, maxLength - 1);
  const lastSpace = candidate.lastIndexOf(" ");
  const cleanCut = lastSpace > maxLength * 0.75 ? candidate.slice(0, lastSpace) : candidate;

  return `${cleanCut.replace(/[\s,;:—-]+$/, "")}…`;
}
