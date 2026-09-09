import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export const markdownComponents = {
    h1: ({ children }) => (
        <h1 className="text-2xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-9 lg:text-5xl lg:leading-13 mt-8 mb-4">
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <h2 className="mb-4 mt-6 text-xl font-bold leading-7 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-8 lg:text-3xl lg:leading-9">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className="mb-4 mt-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100 sm:text-xl sm:leading-7 lg:text-2xl lg:leading-8">
            {children}
        </h3>
    ),
    h4: ({ children }) => (
        <h4 className="mb-4 mt-4 text-base font-medium leading-6 text-gray-900 dark:text-gray-100 sm:text-lg sm:leading-7 lg:text-xl lg:leading-7">
            {children}
        </h4>
    ),
    p: ({ children }) => (
        <p className="text-gray-700 text-justify max-w-none dark:text-gray-200 whitespace-pre-line my-4 leading-relaxed">
            {children}
        </p>
    ),
    a: ({ href, children }) => (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 dark:hover:text-blue-300 transition-colors duration-200 underline underline-offset-4"
        >
            {children}
        </a>
    ),
    ul: ({ children }) => (
        <ul className="list-disc list-inside my-4 space-y-1 text-gray-700 dark:text-gray-200">
            {children}
        </ul>
    ),
    ol: ({ children }) => (
        <ol className="list-decimal list-inside my-4 space-y-1 text-gray-700 dark:text-gray-200">
            {children}
        </ol>
    ),
    table: ({ children }) => (
        <div className="overflow-x-auto my-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-left text-sm">
                {children}
            </table>
        </div>
    ),
    thead: ({ children }) => (
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold">
            {children}
        </thead>
    ),
    tbody: ({ children }) => (
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200">
            {children}
        </tbody>
    ),
    tr: ({ children }) => (
        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            {children}
        </tr>
    ),
    th: ({ children }) => (
        <th className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">
            {children}
        </th>
    ),
    td: ({ children }) => (
        <td className="px-4 py-3 align-top">
            {children}
        </td>
    ),
code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const isMultiLine = String(children).includes("\n");

    if (inline || (!match && !isMultiLine)) {
        return (
            <code
                className="bg-gray-100 dark:bg-gray-800 text-blue-500 px-1.5 py-0.5 rounded text-sm font-mono"
                {...props}
            >
                {children}
            </code>
        );
    }

    const language = match ? match[1] : "text";

    return (
        <div className="my-4 rounded-lg overflow-x-auto text-sm font-mono shadow-md">
            <SyntaxHighlighter
                style={vscDarkPlus}
                language={language}
                PreTag="div"
                customStyle={{
                    margin: 0,
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    whiteSpace: "pre",          // Ensures exact spacing is preserved
                    wordSpacing: "normal",
                    wordBreak: "normal",
                    tabSize: 4,                  // Standardizes tab display to 4 spaces
                }}
                codeTagProps={{
                    style: {
                        whiteSpace: "pre",       // Enforces whitespace preservation on the inner code tag
                        fontFamily: "monospace",
                    }
                }}
                {...props}
            >
                {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
        </div>
    );
},
};

export default markdownComponents;