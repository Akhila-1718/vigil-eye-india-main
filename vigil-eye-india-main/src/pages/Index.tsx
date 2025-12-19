import { Header } from "@/components/Header";
import { CCTVFeed } from "@/components/CCTVFeed";
import { AlertPanel } from "@/components/AlertPanel";
import { EmotionDetector } from "@/components/EmotionDetector";
import { ActivityMonitor } from "@/components/ActivityMonitor";
import { VoiceAgent } from "@/components/VoiceAgent";
import { ZoneStatus } from "@/components/ZoneStatus";

const cctvFeeds = [
  { id: "01", location: "Railway Station - Platform 3", status: "danger" as const, detections: { humans: 45, children: 8, alerts: 2 } },
  { id: "02", location: "Bus Stand - Exit Gate B", status: "warning" as const, detections: { humans: 32, children: 5, alerts: 1 } },
  { id: "03", location: "Mall - Main Entrance", status: "safe" as const, detections: { humans: 67, children: 12, alerts: 0 } },
  { id: "04", location: "Temple - West Gate", status: "safe" as const, detections: { humans: 28, children: 4, alerts: 0 } },
  { id: "05", location: "Mall - Parking Area", status: "warning" as const, detections: { humans: 15, children: 2, alerts: 1 } },
  { id: "06", location: "Railway Station - Ticket Counter", status: "safe" as const, detections: { humans: 52, children: 9, alerts: 0 } },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background bg-grid">
      {/* Ambient glow effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-destructive/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 p-4 space-y-4">
        {/* Header */}
        <Header />

        {/* Main content grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Left column - CCTV Feeds */}
          <div className="col-span-12 lg:col-span-5">
            <div className="glass-card p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Live CCTV Feeds</h2>
                <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                  {cctvFeeds.length} ACTIVE
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {cctvFeeds.slice(0, 1).map((feed) => (
                  <CCTVFeed key={feed.id} {...feed} isMain />
                ))}
                {cctvFeeds.slice(1, 5).map((feed) => (
                  <CCTVFeed key={feed.id} {...feed} />
                ))}
              </div>
            </div>
          </div>

          {/* Middle column - Alerts & Detection */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            <AlertPanel />
            <EmotionDetector />
          </div>

          {/* Right column - Voice Agent & Activity */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <VoiceAgent />
            <ZoneStatus />
          </div>
        </div>

        {/* Bottom row - Activity Monitor */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-8">
            <ActivityMonitor />
          </div>
          <div className="col-span-12 lg:col-span-4">
            {/* Quick stats */}
            <div className="glass-card p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Today's Statistics</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-secondary/50 text-center">
                  <p className="text-2xl font-bold text-primary">2,847</p>
                  <p className="text-xs text-muted-foreground">People Monitored</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50 text-center">
                  <p className="text-2xl font-bold text-success">98.2%</p>
                  <p className="text-xs text-muted-foreground">Safety Rate</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50 text-center">
                  <p className="text-2xl font-bold text-warning">12</p>
                  <p className="text-xs text-muted-foreground">Alerts Today</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50 text-center">
                  <p className="text-2xl font-bold text-destructive">3</p>
                  <p className="text-xs text-muted-foreground">Active Threats</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
