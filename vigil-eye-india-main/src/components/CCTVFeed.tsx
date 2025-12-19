import { Video, Maximize2, Volume2 } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { StatusIndicator } from "./StatusIndicator";
import { cn } from "@/lib/utils";

interface CCTVFeedProps {
  id: string;
  location: string;
  status: "safe" | "warning" | "danger" | "offline";
  detections: {
    humans: number;
    children: number;
    alerts: number;
  };
  isMain?: boolean;
}

export function CCTVFeed({ id, location, status, detections, isMain = false }: CCTVFeedProps) {
  return (
    <div 
      className={cn(
        "relative rounded-lg overflow-hidden border transition-all duration-300",
        status === "danger" && "border-destructive/50 glow-danger",
        status === "warning" && "border-warning/50",
        status === "safe" && "border-border/50",
        status === "offline" && "border-muted-foreground/30 opacity-60",
        isMain && "col-span-2 row-span-2"
      )}
    >
      {/* Simulated video feed background */}
      <div 
        className={cn(
          "bg-gradient-to-br from-secondary to-background bg-grid",
          isMain ? "h-[300px]" : "h-[140px]"
        )}
      >
        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="scan-line h-20 w-full absolute" />
        </div>

        {/* Detection overlay */}
        {detections.alerts > 0 && (
          <div className="absolute inset-0 bg-destructive/5 border-2 border-destructive/30 animate-pulse" />
        )}

        {/* Camera icon placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Video className={cn(
            "opacity-20",
            isMain ? "w-16 h-16" : "w-8 h-8"
          )} />
        </div>
      </div>

      {/* Overlay controls */}
      <div className="absolute top-2 left-2 right-2 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <StatusIndicator status={status} size="sm" />
          <span className="text-xs font-mono bg-background/80 backdrop-blur px-2 py-0.5 rounded text-foreground">
            CAM-{id}
          </span>
        </div>
        <div className="flex gap-1">
          <button className="p-1.5 bg-background/80 backdrop-blur rounded hover:bg-background/90 transition-colors">
            <Volume2 className="w-3 h-3 text-foreground" />
          </button>
          <button className="p-1.5 bg-background/80 backdrop-blur rounded hover:bg-background/90 transition-colors">
            <Maximize2 className="w-3 h-3 text-foreground" />
          </button>
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 to-transparent p-2">
        <p className="text-xs font-medium text-foreground truncate">{location}</p>
        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground font-mono">
          <span>👥 {detections.humans}</span>
          <span>👶 {detections.children}</span>
          {detections.alerts > 0 && (
            <span className="text-destructive font-bold">⚠️ {detections.alerts}</span>
          )}
        </div>
      </div>

      {/* Recording indicator */}
      <div className="absolute top-2 right-12 flex items-center gap-1">
        <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
        <span className="text-[10px] font-mono text-destructive">REC</span>
      </div>
    </div>
  );
}
