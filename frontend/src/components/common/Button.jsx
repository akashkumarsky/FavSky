// src/components/common/Button.jsx
import React from "react";
import clsx from "clsx";

const Button = ({
  type = "button",           // ← IMPORTANT
  className = "",
  disabled = false,
  children,
  ...rest
}) => {
  return (
    <button
      type={type}            // ← IMPORTANT
      disabled={disabled}
      className={clsx(
        "inline-flex items-center justify-center px-4 py-2 rounded-md font-semibold transition",
        "bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60",
        className
      )}
      {...rest}              // ← keep onClick, etc.
    >
      {children}
    </button>
  );
};

export default Button;
