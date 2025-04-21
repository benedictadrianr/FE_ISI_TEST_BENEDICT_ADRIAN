"use client";

import { createClient } from "../utils/supabase/client";
import React, { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const getUser = async () => {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (user) {
    return redirect("/login");
  } else {
    return <div>{children}</div>;
  }
};

export default AuthLayout;
