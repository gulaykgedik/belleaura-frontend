import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
export function Button({ className = "", variant = "primary", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const variants: Record<Variant, string> = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    secondary: "bg-secondary text-secondary-foreground hover:opacity-85",
    ghost: "bg-transparent text-foreground hover:bg-muted-surface",
  };
  return <button className={`inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-55 ${variants[variant]} ${className}`} {...props} />;
}
