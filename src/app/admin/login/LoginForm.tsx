"use client";

import { useActionState } from "react";
import { ArrowRight, LoaderCircle, LockKeyhole } from "lucide-react";
import { loginAction, type LoginState } from "../actions";

const initialState: LoginState = undefined;

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <form action={action} className="grid gap-5">
      {state?.error && (
        <p role="alert" className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}
      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">Admin email</span>
        <input
          name="email"
          type="email"
          autoComplete="username"
          required
          className="h-12 border border-slate-300 bg-white px-4 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
        />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="h-12 border border-slate-300 bg-white px-4 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center gap-2 bg-slate-950 px-5 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? <LoaderCircle className="size-4 animate-spin" /> : <LockKeyhole className="size-4" />}
        {pending ? "Signing in" : "Sign in"}
        {!pending && <ArrowRight className="size-4" />}
      </button>
    </form>
  );
}
