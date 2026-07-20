import { redirect } from "next/navigation";
import { Paintbrush } from "lucide-react";
import { adminAuthConfigured, isAdminAuthenticated } from "@/lib/admin-auth";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) redirect("/admin");
  const configured = adminAuthConfigured();

  return (
    <main className="grid min-h-screen place-items-center px-5 py-12">
      <div className="w-full max-w-md border border-slate-200 bg-white p-7 shadow-xl shadow-slate-950/5 sm:p-9">
        <span className="grid size-12 place-items-center bg-emerald-500 text-slate-950">
          <Paintbrush className="size-6" />
        </span>
        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
          Private workspace
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal">Admin sign in</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Review estimate requests, update lead stages, and keep private follow-up notes.
        </p>
        {!configured && (
          <p className="mt-6 border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">
            Set ADMIN_EMAIL, ADMIN_PASSWORD, and a 32-character ADMIN_SESSION_SECRET to enable access.
          </p>
        )}
        <div className="mt-7">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
