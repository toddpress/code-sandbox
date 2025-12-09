import { useEffect, useRef } from "react";

interface PreviewProps {
  html: string;
  css: string;
  js: string;
}

const Preview = ({ html, css, js }: PreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    const document = iframeRef.current.contentDocument;
    if (!document) return;

    const content = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}<\/script>
        </body>
      </html>
    `;

    document.open();
    document.write(content);
    document.close();
  }, [html, css, js]);

  return (
    <iframe
      ref={iframeRef}
      title="Preview"
      className="h-full w-full bg-white"
      sandbox="allow-scripts"
    />
  );
};

export default Preview;
