import { cn } from "../../lib/utils";

const badgeVariants = {
  default: "bg-accent text-white",
  secondary: "bg-ink-muted text-paper border border-border",
  outline: "border border-accent text-accent",
};

export function Badge({ className, variant = "default", children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-mono font-semibold uppercase tracking-wider transition-colors",
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
