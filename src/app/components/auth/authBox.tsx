"use client";

import React, { FormEvent, useState } from "react";
import Input from "../shared/input";
import Button from "../shared/button";
import { FormData, login, signup } from "@/app/(auth)/actions";
import Link from "next/link";
import { AuthError } from "@supabase/auth-js";

type Props = {
  authType: "login" | "signup";
};

type ErrorState = {
  login: AuthError | null;
  signup: AuthError | null;
};

type FieldErrors = {
  email?: string;
  password?: string;
  username?: string;
};

const AuthBox = ({ authType }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    role: "lead",
  });
  const [error, setError] = useState<ErrorState>({
    login: null,
    signup: null,
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

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

    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const errors: FieldErrors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (authType === "signup" && !formData.username) {
      errors.username = "Username is required";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (authType === "login") {
      return login({
        formData: formData,
        onError: (error: AuthError) => {
          setError((prev) => ({
            ...prev,
            login: error,
          }));
        },
      });
    } else {
      return signup({
        formData: formData,
        onError: (error: AuthError) => {
          setError((prev) => ({
            ...prev,
            signup: error,
          }));
        },
      });
    }
  };

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
              error={fieldErrors.username}
            />
          )}
          <Input
            label="Email"
            name="email"
            type="email"
            required
            onInput={onInput}
            error={fieldErrors.email}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            required
            onInput={onInput}
            error={authType === "signup" ? fieldErrors.password : undefined}
          />
          {error[authType] && (
            <div className="text-red-500 text-sm">
              {error[authType]?.message}
            </div>
          )}
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
