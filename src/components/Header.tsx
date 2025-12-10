import { Code2, Download, Play, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import InstallButton from "./InstallButton";
import JSZip from "jszip";

interface HeaderProps {
  onRun: () => void;
  onReset: () => void;
  html: string;
  css: string;
  js: string;
}

const Header = ({ onRun, onReset, html, css, js }: HeaderProps) => {
  const handleDownload = async () => {
    const zip = new JSZip();
    const timestamp = Date.now();

    // Create index.html with proper structure
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CodeBox Export</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
${html}
  <script src="index.js"></script>
</body>
</html>`;

    // Create index.js wrapped in DOMContentLoaded
    const wrappedJs = `document.addEventListener('DOMContentLoaded', function() {
${js.split('\n').map(line => '  ' + line).join('\n')}
});`;

    zip.file("index.html", fullHtml);
    zip.file("styles.css", css);
    zip.file("index.js", wrappedJs);

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `codebox_${timestamp}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  };

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
        <Button variant="ghost" size="sm" onClick={handleDownload}>
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Download</span>
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
