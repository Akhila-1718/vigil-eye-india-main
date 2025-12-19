import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "primary" | "danger" | "warning" | "success" | "none";
  header?: ReactNode;
}

const glowStyles = {
  primary: "glow-primary",
  danger: "glow-danger",
  warning: "glow-warning",
  success: "glow-success",
  none: "",
};

export function GlassCard({ 
  children, 
  className, 
  glowColor = "none",
  header 
}: GlassCardProps) {
  return (
    <div 
      className={cn(
        "glass-card p-4",
        glowStyles[glowColor],
        className
      )}
    >
      {header && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50">
          {header}
        </div>
      )}
      {children}
    </div>
  );
}
