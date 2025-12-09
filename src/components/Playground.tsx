import { useState, useCallback } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable";
import CodeEditor from "./CodeEditor";
import EditorTabs from "./EditorTabs";
import Preview from "./Preview";
import Header from "./Header";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Monitor, Code } from "lucide-react";

const defaultHtml = `<div class="container">
  <h1>Hello, CodeBox!</h1>
  <p>Start coding and see your changes live.</p>
  <button id="clickMe">Click Me</button>
</div>`;

const defaultCss = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, sans-serif;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  text-align: center;
  padding: 2rem;
}

h1 {
  color: #00d4ff;
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
}

p {
  color: #a0a0a0;
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

button {
  background: linear-gradient(135deg, #00d4ff, #9b59b6);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
}`;

const defaultJs = `document.getElementById('clickMe').addEventListener('click', () => {
  alert('Hello from CodeBox! 🚀');
});`;

const Playground = () => {
  const [html, setHtml] = useState(defaultHtml);
  const [css, setCss] = useState(defaultCss);
  const [js, setJs] = useState(defaultJs);
  const [activeTab, setActiveTab] = useState<"html" | "css" | "javascript">("html");
  const [key, setKey] = useState(0);
  const isMobile = useIsMobile();

  const handleRun = useCallback(() => {
    setKey((prev) => prev + 1);
  }, []);

  const handleReset = useCallback(() => {
    setHtml(defaultHtml);
    setCss(defaultCss);
    setJs(defaultJs);
    setKey((prev) => prev + 1);
  }, []);

  const getCurrentValue = () => {
    switch (activeTab) {
      case "html":
        return html;
      case "css":
        return css;
      case "javascript":
        return js;
    }
  };

  const handleChange = (value: string | undefined) => {
    if (value === undefined) return;
    switch (activeTab) {
      case "html":
        setHtml(value);
        break;
      case "css":
        setCss(value);
        break;
      case "javascript":
        setJs(value);
        break;
    }
  };

  if (isMobile) {
    return (
      <div className="flex h-screen flex-col bg-background">
        <Header onRun={handleRun} onReset={handleReset} />
        <Tabs defaultValue="code" className="flex flex-1 flex-col">
          <TabsList className="mx-4 mt-2 grid w-auto grid-cols-2">
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Code
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>
          <TabsContent value="code" className="flex-1 p-4 pt-2">
            <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border">
              <EditorTabs activeTab={activeTab} onTabChange={setActiveTab} />
              <div className="flex-1 bg-editor-bg">
                <CodeEditor
                  language={activeTab}
                  value={getCurrentValue()}
                  onChange={handleChange}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="preview" className="flex-1 p-4 pt-2">
            <div className="h-full overflow-hidden rounded-lg border border-border">
              <Preview key={key} html={html} css={css} js={js} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <Header onRun={handleRun} onReset={handleReset} />
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="flex h-full flex-col">
            <EditorTabs activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="flex-1 bg-editor-bg">
              <CodeEditor
                language={activeTab}
                value={getCurrentValue()}
                onChange={handleChange}
              />
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-border hover:bg-primary/50 transition-colors" />
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="flex h-full flex-col">
            <div className="flex h-10 items-center border-b border-border bg-card px-4">
              <Monitor className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Preview</span>
            </div>
            <div className="flex-1">
              <Preview key={key} html={html} css={css} js={js} />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Playground;
