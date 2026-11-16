"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Icon } from "./Icons";
import { CallLink } from "./CallLink";
import { PhoneReveal } from "./PhoneReveal";
import { Phone } from "lucide-react";
import { site, services } from "@/lib/site";

const nav = [
  { label: "Homes", href: "/services/interior-painting" },
  { label: "Buildings", href: "/services/property-manager-turnovers" },
  { label: "Businesses", href: "/services/commercial-painting" },
  { label: "Projects & Pricing", href: "/painting" },
  { label: "Service Areas", href: "/areas" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileMenu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (event.key !== "Tab") return;
      const links = mobileMenu.current?.querySelectorAll<HTMLAnchorElement>("a[href]");
      const last = links?.[links.length - 1];
      if (event.shiftKey && document.activeElement === menuButton.current) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); menuButton.current?.focus();
      }
    };
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-[var(--color-cream)]">
      <div className="header-utility hidden lg:block bg-[var(--color-ink)] text-white">
        <div className="container-x flex min-h-8 items-center justify-between gap-5 py-1 text-xs">
          <span>Building paperwork coordinated · Detailed written scopes · Final walkthrough</span>
          <div className="flex shrink-0 items-center gap-5">
            <span className="hidden xl:inline">{site.hours}</span>
            <a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a>
            <PhoneReveal placement="header" className="inline-flex min-h-6 items-center gap-2 font-semibold underline-offset-4" />
          </div>
        </div>
      </div>
      <div className="container-x flex items-center justify-between gap-4 py-5">
        <Link href="/" className="min-w-0" aria-label={`${site.name} home`} onClick={() => setOpen(false)}>
          <Logo preload />
        </Link>

        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-4 xl:gap-7 font-display text-base">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-[var(--color-ink)] hover:text-[var(--color-green-600)] transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <CallLink placement="mobile-header" className="lg:hidden inline-flex min-h-11 items-center gap-1.5 border border-[var(--color-ink)] px-2.5 text-sm font-semibold"><Phone className="size-4" aria-hidden="true" />Call</CallLink>
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/contact" className="btn btn-primary !py-3 text-sm">
              Request estimate <Icon.arrow className="w-4 h-4" />
            </Link>
          </div>
          <button
            ref={menuButton}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden min-h-11 min-w-11 p-2 -mr-2 text-[var(--color-ink)]"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-navigation" ref={mobileMenu} role="navigation" aria-label="Mobile navigation" className="lg:hidden absolute inset-x-0 top-full h-[calc(100dvh-84px)] z-40 bg-[var(--color-cream)] border-t border-[var(--color-line)] overflow-y-auto">
          <div className="container-x py-6 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 text-lg font-medium border-b border-[var(--color-line)]"
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  onClick={() => setOpen(false)}
                  className="py-2 text-[var(--color-muted)]"
                >
                  {s.name}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <CallLink placement="mobile-menu" className="btn btn-ghost w-full" onClick={() => setOpen(false)}><Phone className="size-4" aria-hidden="true" />Call our team</CallLink>
              <a href={`mailto:${site.email}`} className="btn btn-dark w-full">
                Email our team
              </a>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn btn-primary w-full"
              >
                Get a Free Estimate
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
