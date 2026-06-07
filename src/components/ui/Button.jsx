import { cn } from "../../lib/utils";

export function Button({ className, variant = "default", size = "default", children, ...props }) {
  const variants = {
    default: "bg-accent text-white hover:bg-accent-soft",
    outline: "border border-border text-paper hover:bg-ink-muted",
    ghost: "text-muted hover:text-paper hover:bg-ink-muted",
  };
  const sizes = {
    default: "h-10 px-6 py-2 text-sm",
    sm: "h-8 px-4 text-xs",
    lg: "h-12 px-8 text-base",
  };
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-body font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 cursor-pointer",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
