"use client";

import AuthBox from "@/app/components/auth/authBox";
import React from "react";

const Login = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <AuthBox authType="login" />
    </div>
  );
};

export default Login;
