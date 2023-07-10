import React from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const CodeBlock: React.FC<{ children: any; className: string }> = ({ children, className }) => {
  const language = className?.replace("lang-", "") || "text";

  return (
    <SyntaxHighlighter language={language} style={oneDark}>
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
