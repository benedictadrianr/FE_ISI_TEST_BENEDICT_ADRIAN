import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  formAction?: () => void;
};

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  variant = "primary",
  size = "md",
  formAction,
  ...props
}: Props) => {
  const baseStyles =
    "border rounded-md px-4 cursor-pointer transition-colors duration-200";

  const variantStyles = {
    primary: "border-white bg-white hover:bg-zinc-300 text-black",
    secondary: "border-zinc-600 bg-zinc-600 hover:bg-zinc-700 text-white",
    outline: "border-white bg-transparent hover:bg-white/10 text-white",
  };

  const sizeStyles = {
    sm: "py-1 text-sm",
    md: "py-2 text-base",
    lg: "py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      formAction={formAction}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
