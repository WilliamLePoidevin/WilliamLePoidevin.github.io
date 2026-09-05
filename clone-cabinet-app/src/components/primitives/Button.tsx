import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import "./Button.css";

type Variant = "primary" | "secondary" | "ghost";
type Size = "default" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

// Applies to every tappable: scale(.985), 90ms in on ease-press-in, 200ms settle out on
// ease-standard, plus one step darker fill — see Button.css .cc-button:active.
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "default", className, children, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      className={`cc-button cc-button--${variant} cc-button--${size}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      {children}
    </button>
  );
});
