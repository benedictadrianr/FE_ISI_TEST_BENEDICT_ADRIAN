import React, { InputHTMLAttributes } from "react";

type Props = {
  label?: string;
  error?: string;
  type?: "text" | "email" | "password" | "number";
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({
  label,
  error,
  type = "text",
  className = "",
  ...props
}: Props) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={label}
          className="block text-sm font-medium text-zinc-200 mb-1">
          {label}
        </label>
      )}
      <input
        id={label?.toLocaleLowerCase()}
        name={label?.toLocaleLowerCase()}
        type={type}
        className={`
          w-full px-4 py-2 rounded-md
          bg-zinc-800 border
          text-white placeholder-zinc-400
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? "border-red-500" : "border-zinc-700"}
          ${
            props.disabled
              ? "bg-zinc-900 cursor-not-allowed opacity-50"
              : "hover:border-zinc-600"
          }
          transition-colors duration-200
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};

export default Input;
