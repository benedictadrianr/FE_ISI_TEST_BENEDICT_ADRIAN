"use client";

import React, { FormEvent, useState } from "react";
import Input from "../shared/input";
import Button from "../shared/button";
import { login, signup } from "@/app/(auth)/actions";
import Link from "next/link";

type Props = {
  authType: "login" | "signup";
};

const AuthBox = ({ authType }: Props) => {
  const [role, setRole] = useState("lead");
  const [formData, setFormData] = useState<Record<string, string>>({});

  const changeRole = (buttonRole: string) => {
    if (buttonRole === role) return;
    setRole(buttonRole);
  };

  const onInput = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });

    // Add role to form data
    formDataObj.append("role", role);

    if (authType === "login") {
      return login(formDataObj);
    } else {
      return signup(formDataObj);
    }
  };

  return (
    <div className="w-full max-w-[500px] bg-zinc-800 rounded-xl flex flex-col overflow-hidden">
      <div className="flex bg-zinc-400">
        <button
          onClick={() => changeRole("lead")}
          className={`${
            role === "lead" ? "bg-zinc-800" : "bg-none"
          } w-1/2 py-1 text-center hover:bg-zinc-800 cursor-pointer transition-colors rounded-t-md`}>
          LEAD
        </button>
        <button
          onClick={() => changeRole("team")}
          className={`${
            role === "team" ? "bg-zinc-800" : "bg-none"
          } w-1/2 py-1 text-center hover:bg-zinc-800 cursor-pointer transition-colors rounded-t-md`}>
          TEAM
        </button>
      </div>
      <div className="p-4 w-full">
        <h1 className="text-center text-2xl mb-4 uppercase">
          {authType} as {role}
        </h1>
        <form className="space-y-4 w-full">
          {authType === "signup" && (
            <Input
              label="Username"
              name="username"
              type="text"
              required
              onInput={onInput}
            />
          )}
          <Input
            label="Email"
            name="email"
            type="email"
            required
            onInput={onInput}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            required
            onInput={onInput}
          />
          <Link
            href={authType === "login" ? "/signup" : "/login"}
            className="hover:text-blue-700 text-sm w-1/2 text-end transition-colors">
            {authType === "login" ? "Don't" : "Already"} have an account?
          </Link>
          <Button type="submit" formAction={handleSubmit} className="w-full">
            {authType.toUpperCase()}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AuthBox;
