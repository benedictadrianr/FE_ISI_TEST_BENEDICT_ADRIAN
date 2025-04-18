"use server"

import { createClient } from "../server";

export const getTasks = async () => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("to_do_list")
      .select("*");
    if (error) {
      console.error(error.message);
    } else if (data) {
      console.log(data);
    }
  };