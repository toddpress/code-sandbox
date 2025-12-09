import { FileCode, FileType, Braces } from "lucide-react";

type TabType = "html" | "css" | "javascript";

interface EditorTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: "html" as const, label: "HTML", icon: FileCode, className: "editor-tab-html" },
  { id: "css" as const, label: "CSS", icon: FileType, className: "editor-tab-css" },
  { id: "javascript" as const, label: "JS", icon: Braces, className: "editor-tab-js" },
];

const EditorTabs = ({ activeTab, onTabChange }: EditorTabsProps) => {
  return (
    <div className="flex items-center border-b border-border bg-card">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          data-active={activeTab === tab.id}
          className={`editor-tab ${tab.className} flex items-center gap-2 text-muted-foreground`}
        >
          <tab.icon className="h-4 w-4" />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default EditorTabs;
