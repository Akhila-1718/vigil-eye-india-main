import { Shield, Bell, Settings, Wifi } from "lucide-react";
import { StatusIndicator } from "./StatusIndicator";

export function Header() {
  return (
    <header className="glass-card px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20 glow-primary">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              SurakshAI
            </h1>
            <p className="text-xs text-muted-foreground">
              Women & Child Safety Surveillance
            </p>
          </div>
        </div>
        
        <div className="h-8 w-px bg-border/50 mx-4" />
        
        <div className="flex items-center gap-4">
          <StatusIndicator status="safe" label="System Online" size="sm" />
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Wifi className="w-3 h-3 text-success" />
            <span className="font-mono">12 Cameras</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Time display */}
        <div className="text-right mr-4">
          <p className="text-lg font-mono font-bold text-primary">
            {new Date().toLocaleTimeString('en-IN', { hour12: false })}
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            {new Date().toLocaleDateString('en-IN')}
          </p>
        </div>

        <button className="relative p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>
        
        <button className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
          <Settings className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </header>
  );
}
