import { Activity, TrendingUp, Users, AlertCircle } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { cn } from "@/lib/utils";

interface ActivityEvent {
  id: string;
  type: "normal" | "suspicious" | "forceful";
  action: string;
  time: string;
  location: string;
}

const activities: ActivityEvent[] = [
  { id: "1", type: "forceful", action: "Forceful pulling detected", time: "12:34:22", location: "CAM-02" },
  { id: "2", type: "suspicious", action: "Child resisting movement", time: "12:33:45", location: "CAM-05" },
  { id: "3", type: "normal", action: "Normal walking pattern", time: "12:33:12", location: "CAM-01" },
  { id: "4", type: "suspicious", action: "Sudden direction change", time: "12:32:58", location: "CAM-03" },
  { id: "5", type: "normal", action: "Group walking together", time: "12:32:30", location: "CAM-04" },
];

const typeStyles = {
  normal: "text-success border-success/30 bg-success/5",
  suspicious: "text-warning border-warning/30 bg-warning/5",
  forceful: "text-destructive border-destructive/30 bg-destructive/5",
};

const typeLabels = {
  normal: "NORMAL",
  suspicious: "SUSPICIOUS",
  forceful: "FORCEFUL",
};

export function ActivityMonitor() {
  return (
    <GlassCard
      header={
        <>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Activity Log</h2>
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            LIVE FEED
          </span>
        </>
      }
    >
      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="flex items-center gap-2 p-2 rounded bg-secondary/50">
          <Users className="w-4 h-4 text-primary" />
          <div>
            <p className="text-lg font-bold text-foreground">847</p>
            <p className="text-xs text-muted-foreground">People</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 rounded bg-secondary/50">
          <TrendingUp className="w-4 h-4 text-success" />
          <div>
            <p className="text-lg font-bold text-foreground">94%</p>
            <p className="text-xs text-muted-foreground">Normal</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 rounded bg-secondary/50">
          <AlertCircle className="w-4 h-4 text-warning" />
          <div>
            <p className="text-lg font-bold text-foreground">6%</p>
            <p className="text-xs text-muted-foreground">Flagged</p>
          </div>
        </div>
      </div>

      {/* Activity log */}
      <div className="space-y-2 max-h-[200px] overflow-y-auto">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={cn(
              "flex items-center justify-between p-2 rounded border text-sm",
              typeStyles[activity.type]
            )}
          >
            <div className="flex-1">
              <p className="font-medium">{activity.action}</p>
              <p className="text-xs opacity-70">{activity.location}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono">{activity.time}</span>
              <p className="text-[10px] font-bold">{typeLabels[activity.type]}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
