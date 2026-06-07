import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { Database, Home, List } from "lucide-react";

export function Navbar() {
  const { pathname } = useLocation();

  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "/entities", label: "Entities", icon: List },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-ink/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center group-hover:bg-accent-soft transition-colors">
            <Database className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-paper text-lg tracking-tight">
            DummyData
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-body font-medium transition-all duration-200",
                pathname === to
                  ? "bg-accent text-white"
                  : "text-muted hover:text-paper hover:bg-ink-muted"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
