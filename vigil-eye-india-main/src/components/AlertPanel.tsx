import { AlertTriangle, MapPin, Clock, User } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { StatusIndicator } from "./StatusIndicator";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  type: "kidnapping" | "fear" | "suspicious" | "distress";
  location: string;
  time: string;
  description: string;
  severity: "high" | "medium" | "low";
  personType: "child" | "woman" | "unknown";
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "kidnapping",
    location: "Platform 3 - Railway Station",
    time: "2 min ago",
    description: "Child being forcefully pulled by unknown adult",
    severity: "high",
    personType: "child",
  },
  {
    id: "2",
    type: "fear",
    location: "Exit Gate B - Bus Stand",
    time: "5 min ago",
    description: "Woman showing signs of distress and fear",
    severity: "medium",
    personType: "woman",
  },
  {
    id: "3",
    type: "suspicious",
    location: "Parking Area - Mall",
    time: "8 min ago",
    description: "Unusual gathering near vehicle",
    severity: "low",
    personType: "unknown",
  },
];

const severityMap = {
  high: "danger",
  medium: "warning",
  low: "safe",
} as const;

const typeLabels = {
  kidnapping: "⚠️ KIDNAPPING ALERT",
  fear: "😰 FEAR DETECTED",
  suspicious: "🔍 SUSPICIOUS ACTIVITY",
  distress: "🆘 DISTRESS SIGNAL",
};

export function AlertPanel() {
  return (
    <GlassCard
      className="h-full"
      header={
        <>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <h2 className="text-lg font-semibold text-foreground">Live Alerts</h2>
          </div>
          <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
            {mockAlerts.length} ACTIVE
          </span>
        </>
      }
    >
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {mockAlerts.map((alert) => (
          <div
            key={alert.id}
            className={cn(
              "p-3 rounded-lg border transition-all duration-300 hover:scale-[1.02] cursor-pointer",
              alert.severity === "high" && "bg-destructive/10 border-destructive/30 glow-danger",
              alert.severity === "medium" && "bg-warning/10 border-warning/30",
              alert.severity === "low" && "bg-secondary border-border/50"
            )}
          >
            <div className="flex items-start justify-between mb-2">
              <span 
                className={cn(
                  "text-xs font-bold tracking-wide",
                  alert.severity === "high" && "text-destructive text-glow",
                  alert.severity === "medium" && "text-warning",
                  alert.severity === "low" && "text-muted-foreground"
                )}
              >
                {typeLabels[alert.type]}
              </span>
              <StatusIndicator 
                status={severityMap[alert.severity]} 
                size="sm" 
              />
            </div>
            
            <p className="text-sm text-foreground mb-2">{alert.description}</p>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {alert.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {alert.time}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {alert.personType}
              </span>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
