import { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MarkdownEditor({
    value,
    onChange,
    onImageUpload,
    error = null,
}) {
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
        if (textareaRef.current) {
            autoResize(textareaRef.current);
        }
    }, [value]);

    return (
        <div className="max-w-5xl flex flex-col flex-grow">
            {/* TOOLBAR */}
            <div className="sticky top-0 z-50">
                <div className="flex gap-2 mb-2 bg-gray-200 py-2 px-10">
                    {toolbar.map((btn, i) => (
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
            </div>

            {/* TEXTAREA */}
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

            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
}
