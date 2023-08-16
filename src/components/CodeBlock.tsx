import { useState, FC, ReactNode, useEffect } from "react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy } from "react-icons/fa";

const CodeBlock: FC<{ children: any; className: string }> = ({ children, className }): ReactNode => {
  const language = className?.replace("lang-", "") || "text";
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }, [isCopied]);

  return (
    <div className="code relative">
      <CopyToClipboard text={children}>
        <button className="absolute top-2 right-2 btn btn-sm btn-outline btn-primary flex items-center justify-center" onClick={() => setIsCopied(true)} disabled={isCopied}>
          {isCopied ? "Copied!" : <FaCopy />}
        </button>
      </CopyToClipboard>
      <SyntaxHighlighter language={language} style={oneDark} showLineNumbers>
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
