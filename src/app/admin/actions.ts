"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  adminAuthConfigured,
  clearAdminSession,
  createAdminSession,
  requireAdmin,
  verifyAdminCredentials,
} from "@/lib/admin-auth";
import { intakeStatuses, updateIntake } from "@/lib/intakes";

export type LoginState = { error?: string } | undefined;

export async function loginAction(
  _state: LoginState,
  formData: FormData
): Promise<LoginState> {
  if (!adminAuthConfigured()) {
    return { error: "Admin access is not configured." };
  }

  const email = String(formData.get("email") ?? "").slice(0, 200);
  const password = String(formData.get("password") ?? "").slice(0, 300);

  if (!verifyAdminCredentials(email, password)) {
    await new Promise((resolve) => setTimeout(resolve, 450));
    return { error: "Email or password is incorrect." };
  }

  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function updateIntakeAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const notes = String(formData.get("notes") ?? "");
  const validId = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);

  if (!validId || !intakeStatuses.includes(status as (typeof intakeStatuses)[number])) {
    throw new Error("Invalid intake update.");
  }

  await updateIntake({
    id,
    status: status as (typeof intakeStatuses)[number],
    notes,
  });
  revalidatePath("/admin");
  revalidatePath(`/admin/intakes/${id}`);
}
