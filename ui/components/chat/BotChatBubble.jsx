import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  nightOwl,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";
import { FaRobot, FaClipboardList, FaHatCowboy, FaCode } from "react-icons/fa";
import { useCookie } from "../../hooks/useCookie";
import { useTheme } from "../../hooks/ThemeContext";
export default function BotChatBubble({ children, bot_name = "" }) {
  const [codeStyle, setCodeStyle] = useState(oneLight); // Default to light theme

  const { theme } = useTheme();

  useEffect(() => {
    console.log("Theme changed:", theme); // For debugging
    setCodeStyle(theme === "dark" ? nightOwl : oneLight);
  }, [theme]);

  const agents_props = {
    supervisor: {
      icon: <FaRobot />,
    },
    pentester: {
      icon: <FaHatCowboy />,
    },
    evaluator: {
      icon: <FaClipboardList />,
    },
    tools_node: {
      icon: <FaCode />,
    },
  };

  return (
    <div>
      <div className="flex gap-1 justify-center items-center w-fit">
        <span className="text-gray-500">
          {agents_props[bot_name]?.icon || <FaRobot />}
        </span>
        <span className="text-gray-500 capitalize">{bot_name}</span>
      </div>
      <div className="p-4 mr-auto bg-[#F1F4FA] dark:bg-gray-800 dark:text-slate-300 rounded-md shadow-md max-w-[90%]">
        <ReactMarkdown
          className="dark:text-white"
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
