import { useState, useCallback } from "react";
import { Mic, MicOff, Volume2, Globe, Phone, PhoneOff } from "lucide-react";
import { Button } from "./ui/button";
import { GlassCard } from "./GlassCard";
import { cn } from "@/lib/utils";

type Language = "telugu" | "tamil" | "marathi" | "bengali" | "odia" | "hindi";

interface LanguageConfig {
  code: Language;
  name: string;
  nativeName: string;
  greeting: string;
  listening: string;
  speaking: string;
}

const languages: LanguageConfig[] = [
  { code: "telugu", name: "Telugu", nativeName: "తెలుగు", greeting: "నమస్కారం! నేను మీకు ఎలా సహాయం చేయగలను?", listening: "వింటున్నాను...", speaking: "మాట్లాడుతున్నాను..." },
  { code: "tamil", name: "Tamil", nativeName: "தமிழ்", greeting: "வணக்கம்! நான் உங்களுக்கு எப்படி உதவ முடியும்?", listening: "கேட்கிறேன்...", speaking: "பேசுகிறேன்..." },
  { code: "marathi", name: "Marathi", nativeName: "मराठी", greeting: "नमस्कार! मी तुम्हाला कशी मदत करू शकतो?", listening: "ऐकत आहे...", speaking: "बोलत आहे..." },
  { code: "bengali", name: "Bengali", nativeName: "বাংলা", greeting: "নমস্কার! আমি আপনাকে কিভাবে সাহায্য করতে পারি?", listening: "শুনছি...", speaking: "বলছি..." },
  { code: "odia", name: "Odia", nativeName: "ଓଡ଼ିଆ", greeting: "ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?", listening: "ଶୁଣୁଛି...", speaking: "କହୁଛି..." },
  { code: "hindi", name: "Hindi", nativeName: "हिंदी", greeting: "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?", listening: "सुन रहा हूँ...", speaking: "बोल रहा हूँ..." },
];

type AgentState = "idle" | "listening" | "processing" | "speaking";

export function VoiceAgent() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("telugu");
  const [agentState, setAgentState] = useState<AgentState>("idle");
  const [isConnected, setIsConnected] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");

  const currentLang = languages.find(l => l.code === selectedLanguage)!;

  const handleConnect = useCallback(() => {
    setIsConnected(true);
    setAgentState("idle");
    setResponse(currentLang.greeting);
  }, [currentLang]);

  const handleDisconnect = useCallback(() => {
    setIsConnected(false);
    setAgentState("idle");
    setTranscript("");
    setResponse("");
  }, []);

  const handleStartListening = useCallback(() => {
    if (!isConnected) return;
    setAgentState("listening");
    setTranscript("");
    
    // Simulate listening
    setTimeout(() => {
      setTranscript("ఎమర్జెన్సీ అలర్ట్ నివేదిక ఇవ్వండి"); // Example Telugu
      setAgentState("processing");
      
      setTimeout(() => {
        setAgentState("speaking");
        setResponse("చివరి గంటలో 3 అలర్ట్‌లు వచ్చాయి. 2 అధిక తీవ్రత, 1 మధ్యస్థ తీవ్రత. రైల్వే స్టేషన్ ప్లాట్‌ఫామ్ 3 వద్ద అత్యంత తీవ్రమైన సంఘటన నివేదించబడింది.");
        
        setTimeout(() => setAgentState("idle"), 3000);
      }, 1500);
    }, 2000);
  }, [isConnected]);

  const handleStopListening = useCallback(() => {
    setAgentState("idle");
  }, []);

  return (
    <GlassCard
      glowColor={agentState === "listening" ? "primary" : agentState === "speaking" ? "success" : "none"}
      header={
        <>
          <div className="flex items-center gap-2">
            <div className={cn(
              "p-2 rounded-full",
              isConnected ? "bg-success/20" : "bg-muted"
            )}>
              <Phone className={cn(
                "w-4 h-4",
                isConnected ? "text-success" : "text-muted-foreground"
              )} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Voice AI Agent</h2>
              <p className="text-xs text-muted-foreground">
                {isConnected ? "Connected" : "Disconnected"}
              </p>
            </div>
          </div>
          <Button
            variant={isConnected ? "danger" : "glow"}
            size="sm"
            onClick={isConnected ? handleDisconnect : handleConnect}
          >
            {isConnected ? <PhoneOff className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
            {isConnected ? "End" : "Connect"}
          </Button>
        </>
      }
    >
      {/* Language selector */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Select Language</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={cn(
                "p-2 rounded-lg border text-center transition-all",
                selectedLanguage === lang.code
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-secondary/50 text-foreground hover:border-primary/50"
              )}
            >
              <p className="text-sm font-medium">{lang.nativeName}</p>
              <p className="text-xs text-muted-foreground">{lang.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Voice visualization */}
      <div className="relative h-32 mb-4 rounded-lg bg-secondary/50 flex items-center justify-center overflow-hidden">
        {/* Waveform visualization */}
        <div className="flex items-center gap-1">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-1 bg-primary rounded-full transition-all duration-150",
                agentState === "listening" || agentState === "speaking"
                  ? "animate-pulse"
                  : ""
              )}
              style={{
                height: agentState === "idle" 
                  ? "8px" 
                  : `${Math.random() * 40 + 20}px`,
                animationDelay: `${i * 0.05}s`
              }}
            />
          ))}
        </div>

        {/* State indicator */}
        <div className="absolute bottom-2 left-2 right-2">
          <p className={cn(
            "text-sm font-medium text-center",
            agentState === "listening" && "text-primary",
            agentState === "speaking" && "text-success",
            agentState === "processing" && "text-warning",
            agentState === "idle" && "text-muted-foreground"
          )}>
            {agentState === "listening" && currentLang.listening}
            {agentState === "speaking" && currentLang.speaking}
            {agentState === "processing" && "Processing..."}
            {agentState === "idle" && (isConnected ? "Ready" : "Press Connect")}
          </p>
        </div>
      </div>

      {/* Transcript & Response */}
      <div className="space-y-3 mb-4">
        {transcript && (
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
            <p className="text-xs text-primary mb-1 flex items-center gap-1">
              <Mic className="w-3 h-3" /> You said:
            </p>
            <p className="text-sm text-foreground">{transcript}</p>
          </div>
        )}
        {response && (
          <div className="p-3 rounded-lg bg-success/10 border border-success/30">
            <p className="text-xs text-success mb-1 flex items-center gap-1">
              <Volume2 className="w-3 h-3" /> AI Response:
            </p>
            <p className="text-sm text-foreground">{response}</p>
          </div>
        )}
      </div>

      {/* Mic button */}
      <div className="flex justify-center">
        <Button
          variant={agentState === "listening" ? "destructive" : "glow"}
          size="xl"
          className="rounded-full w-20 h-20"
          onClick={agentState === "listening" ? handleStopListening : handleStartListening}
          disabled={!isConnected || agentState === "processing" || agentState === "speaking"}
        >
          {agentState === "listening" ? (
            <MicOff className="w-8 h-8" />
          ) : (
            <Mic className="w-8 h-8" />
          )}
        </Button>
      </div>
    </GlassCard>
  );
}
