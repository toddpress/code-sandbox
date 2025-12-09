import { useState, useEffect } from "react";
import { Download, Check } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const installedHandler = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", installedHandler);

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      toast.info("Add to home screen from your browser menu");
      return;
    }

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === "accepted") {
        toast.success("App installed successfully!");
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } catch (error) {
      toast.error("Installation failed");
    }
  };

  if (isInstalled) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Check className="h-4 w-4" />
        <span className="hidden sm:inline">Installed</span>
      </Button>
    );
  }

  return (
    <Button variant="outline" size="sm" onClick={handleInstall}>
      <Download className="h-4 w-4" />
      <span className="hidden sm:inline">Install</span>
    </Button>
  );
};

export default InstallButton;
