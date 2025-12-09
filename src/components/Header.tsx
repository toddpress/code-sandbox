import { Code2, Download, Play, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import InstallButton from "./InstallButton";

interface HeaderProps {
  onRun: () => void;
  onReset: () => void;
}

const Header = ({ onRun, onReset }: HeaderProps) => {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Code2 className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">CodeBox</h1>
          <p className="text-xs text-muted-foreground">Live Code Playground</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw className="h-4 w-4" />
          <span className="hidden sm:inline">Reset</span>
        </Button>
        <Button variant="glow" size="sm" onClick={onRun}>
          <Play className="h-4 w-4" />
          <span className="hidden sm:inline">Run</span>
        </Button>
        <InstallButton />
      </div>
    </header>
  );
};

export default Header;
