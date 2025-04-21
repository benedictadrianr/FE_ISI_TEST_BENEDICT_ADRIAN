"use client";

import AuthBox from "@/app/components/auth/authBox";
import React from "react";

const Signup = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <AuthBox authType="signup" />
    </div>
  );
};

export default Signup;
