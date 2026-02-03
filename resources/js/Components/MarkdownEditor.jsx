import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function MarkdownEditor({
    value,
    onChange,
    onImageUpload,
    error = null,
}) {
    const [mode, setMode] = useState("edit"); 
    const textareaRef = useRef(null);

    const insertAtCursor = (before, after = "") => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selected = value.substring(start, end);

        const newValue =
            value.substring(0, start) +
            before +
            selected +
            after +
            value.substring(end);

        onChange(newValue);

        // restore cursor
        requestAnimationFrame(() => {
            textarea.focus();
            textarea.selectionStart = start + before.length;
            textarea.selectionEnd = start + before.length + selected.length;
        });
    };

    const toolbar = [
        { label: "B", action: () => insertAtCursor("**", "**"), tooltip: "Bold" },
        { label: "I", action: () => insertAtCursor("_", "_"), tooltip: "Italic" },
        { label: "S", action: () => insertAtCursor("~~", "~~"), tooltip: "Strikethrough" },
        { label: "H", action: () => insertAtCursor("\n## "), tooltip: "Heading" },
        {
            label: <FontAwesomeIcon icon="list-ol" />,
            action: () => insertAtCursor("\n1. "),
            tooltip: "Numbered list",
        },
        {
            label: <FontAwesomeIcon icon="list-ul" />,
            action: () => insertAtCursor("\n- "),
            tooltip: "Bullet list",
        },
        { label: "</>", action: () => insertAtCursor("`", "`"), tooltip: "Inline code" },
        {
            label: <FontAwesomeIcon icon="laptop-code" />,
            action: () => insertAtCursor("\n```\n", "\n```\n"),
            tooltip: "Code block",
        },
        {
            label: <FontAwesomeIcon icon="divide" />,
            action: () => insertAtCursor("\n---\n"),
            tooltip: "Divider",
        },
        {
            label: <FontAwesomeIcon icon="underline" />,
            action: () => insertAtCursor("<u>", "</u>"),
            tooltip: "Underline",
        },
        {
            label: <FontAwesomeIcon icon="highlighter" />,
            action: () => insertAtCursor("<mark>", "</mark>"),
            tooltip: "Highlighter",
        },
        {
            label: <FontAwesomeIcon icon="link" />,
            action: () => insertAtCursor("[text](url)"),
            tooltip: "Link",
        },
        {
            label: <FontAwesomeIcon icon="image" />,
            action: onImageUpload,
            tooltip: "Image",
        },
    ];

    const autoResize = (el) => {
        if (!el) return;
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
    };

    useEffect(() => {
        if (mode === "edit" && textareaRef.current) {
            autoResize(textareaRef.current);
        }
    }, [value, mode]);

    return (
        <div className="max-w-5xl flex flex-col flex-grow">
            {/* TOOLBAR */}
            <div className="sticky top-0 z-50">
                <div className="flex justify-between items-center mb-2 bg-gray-200 py-2 px-10">
                    <div className="flex gap-2">
                        {mode === "edit" &&
                            toolbar.map((btn, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={btn.action}
                                    className="px-3 py-1 font-bold text-black rounded hover:bg-blue-400/40"
                                    title={btn.tooltip}
                                >
                                    {btn.label}
                                </button>
                            ))}
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setMode("edit")}
                            className={`px-3 py-1 font-bold text-black rounded ${
                                mode === "edit" ? "bg-blue-400/40" : ""
                            }`}
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode("preview")}
                            className={`px-3 py-1 font-bold text-black rounded ${
                                mode === "preview" ? "bg-blue-400/40" : ""
                            }`}
                        >
                            Preview
                        </button>
                    </div>
                </div>
            </div>

            {/* TEXTAREA OR PREVIEW */}
            {mode === "edit" ? (
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => {
                        onChange(e.target.value);
                        autoResize(e.target);
                    }}
                    rows={1}
                    className="w-full resize-none overflow-hidden text-black p-3 px-10 focus:outline-none flex-grow"
                    placeholder="Write your post in Markdown..."
                />
            ) : (
                <div className="p-10 max-w-none prose text-black">
                    <ReactMarkdown
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            h1: ({ node, ...props }) => (
                                <h1
                                    className="text-4xl font-bold my-4"
                                    {...props}
                                />
                            ),
                            h2: ({ node, ...props }) => (
                                <h2
                                    className="text-3xl font-bold my-3"
                                    {...props}
                                />
                            ),
                            h3: ({ node, ...props }) => (
                                <h3
                                    className="text-2xl font-bold my-3"
                                    {...props}
                                />
                            ),
                            hr: ({ node, ...props }) => (
                                <hr
                                    className="border-t-2 border-gray-300 my-4"
                                    {...props}
                                />
                            ),
                            mark: ({ node, ...props }) => (
                                <mark
                                    className="bg-gray-300/50 dark:bg-yellow-300/50 rounded-md px-2"
                                    {...props}
                                />
                            ),
                        }}
                    >
                        {value}
                    </ReactMarkdown>
                </div>
            )}

            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
}
