import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { Logo } from "@/components/Logo";
import { logoutAction } from "./actions";

export function AdminHeader() {
  return (
    <header className="border-b border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto flex min-h-16 max-w-[90rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/admin" className="flex min-w-0 items-center gap-3">
          <span className="min-w-0">
            <span className="block rounded bg-[var(--color-cream)] px-2 py-1"><Logo /></span>
            <span className="block text-xs text-slate-400">Intake operations</span>
          </span>
        </Link>
        <div className="flex items-center gap-1">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            title="Open website"
            aria-label="Open website"
            className="grid size-10 place-items-center text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            <ExternalLink className="size-4" />
          </a>
          <form action={logoutAction}>
            <button
              type="submit"
              title="Sign out"
              aria-label="Sign out"
              className="grid size-10 place-items-center text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              <LogOut className="size-4" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
