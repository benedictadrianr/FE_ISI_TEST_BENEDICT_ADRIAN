"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getUser = async () => {
    try {
      const supabase = await createClient();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) throw error;

      setUser(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return <div>{children}</div>;
};

export default DashboardLayout;
