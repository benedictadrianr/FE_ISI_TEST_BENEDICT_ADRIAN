"use client";

import React, { FormEvent, useState } from "react";
import Input from "../shared/input";
import Button from "../shared/button";
import { FormData, login, signup } from "@/app/(auth)/actions";
import Link from "next/link";

type Props = {
  authType: "login" | "signup";
};

const AuthBox = ({ authType }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    role: "lead",
  });

  const changeRole = (buttonRole: string) => {
    if (buttonRole === formData.role) return;
    setFormData((prev) => ({
      ...prev,
      role: buttonRole,
    }));
  };

  const onInput = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log("form data object", formData);

    if (authType === "login") {
      return login(formData);
    } else {
      return signup(formData);
    }
  };

  console.log(formData);

  return (
    <div className="w-full max-w-[500px] bg-zinc-800 rounded-xl flex flex-col overflow-hidden">
      {authType === "signup" && (
        <div className="flex bg-zinc-400">
          <button
            onClick={() => changeRole("lead")}
            className={`${
              formData.role === "lead" ? "bg-zinc-800" : "bg-none"
            } w-1/2 py-1 text-center hover:bg-zinc-800 cursor-pointer transition-colors rounded-t-md`}>
            LEAD
          </button>
          <button
            onClick={() => changeRole("team")}
            className={`${
              formData.role === "team" ? "bg-zinc-800" : "bg-none"
            } w-1/2 py-1 text-center hover:bg-zinc-800 cursor-pointer transition-colors rounded-t-md`}>
            TEAM
          </button>
        </div>
      )}
      <div className="p-4 w-full">
        <h1 className="text-center text-2xl mb-4 uppercase">
          {authType} {authType === "signup" && `as ${formData.role}`}
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
