import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  nightOwl,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";
// icon
import { FaRobot } from "react-icons/fa";
export default function BotChatBubble({ children }) {
  const [codeStyle, setCodeStyle] = useState(nightOwl);
  const [theme, setTheme] = useState(
    typeof window !== "undefined" ? localStorage.getItem("theme") : null
  );

  // TODO: Change theme of markdown based on dark or light mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleStorageChange = () => {
        setTheme(localStorage.getItem("theme"));
      };

      window.addEventListener("storage", handleStorageChange);

      // Cleanup
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      setCodeStyle(nightOwl);
    } else if (theme === "light") {
      console.log("oneLight");
      setCodeStyle(oneLight);
    }
  }, [theme]);

  return (
    <div>
      <div className="flex gap-1 justify-center items-center w-fit">
        <FaRobot className=" text-gray-500" />
        <span className="text-gray-500">Bot</span>
      </div>
      <div className="p-4 mr-auto dark:bg-gray-800 dark:text-slate-300 rounded-md shadow-lg max-w-[90%]">
        <ReactMarkdown
          className="text-white"
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={codeStyle}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            table({ node, ...props }) {
              return (
                <table
                  style={{ borderCollapse: "collapse", width: "100%" }}
                  {...props}
                />
              );
            },
            th({ node, ...props }) {
              return (
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                  }}
                  {...props}
                />
              );
            },
            td({ node, ...props }) {
              return (
                <td
                  style={{ border: "1px solid #ddd", padding: "8px" }}
                  {...props}
                />
              );
            },
          }}
        >
          {children}
        </ReactMarkdown>
      </div>
    </div>
  );
}
