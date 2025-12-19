import { GlassCard } from "./GlassCard";
import { cn } from "@/lib/utils";

interface EmotionData {
  emotion: string;
  icon: string;
  percentage: number;
  count: number;
  riskLevel: "low" | "medium" | "high";
}

const emotions: EmotionData[] = [
  { emotion: "Fear", icon: "😨", percentage: 12, count: 3, riskLevel: "high" },
  { emotion: "Distress", icon: "😰", percentage: 8, count: 2, riskLevel: "high" },
  { emotion: "Crying", icon: "😢", percentage: 5, count: 1, riskLevel: "medium" },
  { emotion: "Panic", icon: "😱", percentage: 3, count: 1, riskLevel: "high" },
  { emotion: "Neutral", icon: "😐", percentage: 45, count: 28, riskLevel: "low" },
  { emotion: "Happy", icon: "😊", percentage: 27, count: 15, riskLevel: "low" },
];

const riskColors = {
  low: "bg-success",
  medium: "bg-warning",
  high: "bg-destructive",
};

export function EmotionDetector() {
  const riskEmotions = emotions.filter(e => e.riskLevel === "high" || e.riskLevel === "medium");
  
  return (
    <GlassCard
      header={
        <>
          <h2 className="text-lg font-semibold text-foreground">Emotion Analysis</h2>
          <span className="text-xs font-mono text-warning bg-warning/10 px-2 py-1 rounded">
            {riskEmotions.reduce((acc, e) => acc + e.count, 0)} AT RISK
          </span>
        </>
      }
    >
      <div className="space-y-3">
        {emotions.map((emotion) => (
          <div key={emotion.emotion} className="flex items-center gap-3">
            <span className="text-xl w-8">{emotion.icon}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{emotion.emotion}</span>
                <span className={cn(
                  "text-xs font-mono",
                  emotion.riskLevel === "high" && "text-destructive",
                  emotion.riskLevel === "medium" && "text-warning",
                  emotion.riskLevel === "low" && "text-muted-foreground"
                )}>
                  {emotion.count} detected
                </span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    riskColors[emotion.riskLevel]
                  )}
                  style={{ width: `${emotion.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded bg-success/10">
            <p className="text-lg font-bold text-success">72%</p>
            <p className="text-xs text-muted-foreground">Safe</p>
          </div>
          <div className="p-2 rounded bg-warning/10">
            <p className="text-lg font-bold text-warning">13%</p>
            <p className="text-xs text-muted-foreground">Monitor</p>
          </div>
          <div className="p-2 rounded bg-destructive/10">
            <p className="text-lg font-bold text-destructive">15%</p>
            <p className="text-xs text-muted-foreground">At Risk</p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
