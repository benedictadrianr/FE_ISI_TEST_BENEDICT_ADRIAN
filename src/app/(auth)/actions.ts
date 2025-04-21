"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthError } from "@supabase/auth-js";
import { createClient } from "../utils/supabase/server";

export interface FormData {
  username?: string;
  email: string;
  password: string;
  role?: string;
}

export async function login(
  { formData, onError }: {
    formData: FormData;
    onError: (error: AuthError) => void;
  },
) {
  const supabase = await createClient();

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error);
    return onError(error);
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(
  { formData, onError }: {
    formData: FormData;
    onError: (error: AuthError) => void;
  },
) {
  const supabase = await createClient();

  const data = {
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        username: formData.username,
        role: formData.role,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log(error);
    return onError(error);
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
