import { MapPin } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { StatusIndicator } from "./StatusIndicator";

interface Zone {
  id: string;
  name: string;
  status: "safe" | "warning" | "danger" | "offline";
  cameras: number;
  people: number;
}

const zones: Zone[] = [
  { id: "1", name: "Railway Station", status: "danger", cameras: 4, people: 234 },
  { id: "2", name: "Bus Stand", status: "warning", cameras: 3, people: 156 },
  { id: "3", name: "Shopping Mall", status: "safe", cameras: 3, people: 412 },
  { id: "4", name: "Temple Complex", status: "safe", cameras: 2, people: 89 },
];

export function ZoneStatus() {
  return (
    <GlassCard
      header={
        <>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Zone Overview</h2>
          </div>
        </>
      }
    >
      <div className="space-y-3">
        {zones.map((zone) => (
          <div 
            key={zone.id}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <StatusIndicator status={zone.status} size="md" />
              <div>
                <p className="text-sm font-medium text-foreground">{zone.name}</p>
                <p className="text-xs text-muted-foreground">
                  {zone.cameras} cameras • {zone.people} people
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-mono text-muted-foreground uppercase">
                {zone.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
