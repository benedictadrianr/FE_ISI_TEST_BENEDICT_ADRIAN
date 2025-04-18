import React from "react";

type Props = {
  role?: string;
};

const RoleTag = ({ role = "team" }: Props) => {
  return (
    <div
      className={`border rounded-md px-2 py-1 text-center ${
        role === "lead"
          ? "text-red-500 border-red-500"
          : "text-blue-500 border-blue-500"
      }`}>
      {role.toUpperCase()}
    </div>
  );
};

export default RoleTag;
