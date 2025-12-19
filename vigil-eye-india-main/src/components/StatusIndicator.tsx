import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "safe" | "warning" | "danger" | "offline";
  label?: string;
  showPulse?: boolean;
  size?: "sm" | "md" | "lg";
}

const statusConfig = {
  safe: {
    color: "bg-success",
    glow: "glow-success",
    text: "text-success",
  },
  warning: {
    color: "bg-warning",
    glow: "glow-warning",
    text: "text-warning",
  },
  danger: {
    color: "bg-destructive",
    glow: "glow-danger",
    text: "text-destructive",
  },
  offline: {
    color: "bg-muted-foreground",
    glow: "",
    text: "text-muted-foreground",
  },
};

const sizeConfig = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

export function StatusIndicator({ 
  status, 
  label, 
  showPulse = true, 
  size = "md" 
}: StatusIndicatorProps) {
  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div 
          className={cn(
            "rounded-full",
            sizeConfig[size],
            config.color,
            config.glow
          )}
        />
        {showPulse && status !== "offline" && (
          <div 
            className={cn(
              "absolute inset-0 rounded-full pulse-ring",
              config.color,
              "opacity-50"
            )}
          />
        )}
      </div>
      {label && (
        <span className={cn("text-sm font-medium", config.text)}>
          {label}
        </span>
      )}
    </div>
  );
}
