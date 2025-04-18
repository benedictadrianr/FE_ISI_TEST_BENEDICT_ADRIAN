"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";

export interface FormData {
  username?:string,
  email: string,
  password: string,
  role?: string,
}

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error);
    return;
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        username: formData.username,
        role: formData.role,
      }
    }
  }

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log(error);
    return;
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
