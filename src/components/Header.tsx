"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Icon } from "./Icons";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-cream)]/94 backdrop-blur-xl border-b border-[var(--color-line)] shadow-[0_10px_30px_rgba(16,27,36,.05)]"
          : "bg-[var(--color-cream)]"
      }`}
    >
      {/* top trust strip */}
      <div className="hidden md:block bg-[var(--color-ink)] text-[var(--color-cream)]/90 text-[0.8rem]">
        <div className="container-x flex items-center justify-between py-1.5">
          <span className="inline-flex items-center gap-2">
            <Icon.shield className="w-4 h-4 text-[var(--color-green-300)]" />
            Fully insured · Detailed written scopes · 3-year workmanship warranty
          </span>
          <span className="inline-flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <Icon.clock className="w-4 h-4 text-[var(--color-green-300)]" />
              {site.hours}
            </span>
            <a href={`mailto:${site.email}`} className="font-semibold hover:text-[var(--color-green-300)]">
              {site.email}
            </a>
          </span>
        </div>
      </div>

      <div className="container-x flex items-center justify-between py-3">
        <Link href="/" aria-label={`${site.name} home`} onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-[0.9rem] font-semibold">
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

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/contact" className="btn btn-primary !py-3">
              Request estimate <Icon.arrow className="w-4 h-4" />
            </Link>
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 -mr-2 text-[var(--color-ink)]"
            aria-label="Toggle menu"
            aria-expanded={open}
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
        <div className="lg:hidden fixed inset-x-0 top-[65px] md:top-[94px] bottom-0 z-40 bg-[var(--color-cream)] border-t border-[var(--color-line)] overflow-y-auto">
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
