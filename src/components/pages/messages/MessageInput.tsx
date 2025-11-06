"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Send, Paperclip } from "lucide-react";
import Image from "next/image";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setFilePreviewUrl(fileUrl);
    }
  };

  // ✅ Auto-grow height up to 4 rows
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // reset
      const maxHeight = 4 * 24; // 4 rows * approx. 24px line-height
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    }
  }, [message]);

  // ✅ Handle Enter to send, Shift+Enter for newline
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <div className="p-4 border-t border-bg-primary">
      {selectedFile && (
        <div className="mt-3 text-white space-y-2">
          <p className="text-sm text-gray-400">📎 الملف المرفق:</p>
          {selectedFile.type.startsWith("image/") ? (
            <Image
              width={200}
              height={200}
              src={filePreviewUrl ?? ""}
              alt="preview"
              className="max-w-xs max-h-52 rounded-lg border border-gray-600"
            />
          ) : selectedFile.type.startsWith("video/") ? (
            <video
              controls
              className="max-w-xs max-h-52 rounded-lg border border-gray-600"
              src={filePreviewUrl ?? ""}
            />
          ) : (
            <div className="text-sm bg-bg-secondary p-2 rounded border border-gray-600">
              📄 {selectedFile.name}
            </div>
          )}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-end gap-2"
      >
        <div>
          <label htmlFor="file-upload">
            <div
              id="file-upload-button"
              className="p-2 text-gray-400 cursor-pointer bg-bg-primary hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Paperclip className="w-5 h-5" />
            </div>
            <input
              type="file"
              id="file-upload"
              accept="image/*,application/pdf,.doc,.docx,.zip,video/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* ✅ Growable Textarea */}
        <div className="flex-1 -mb-2 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="اكتب رسالة..."
            className="w-full bg-bg-secondary text-white placeholder-gray-400 rounded-lg py-3 px-4 pr-12 resize-none focus:outline-none ring-2 ring-transparent focus:ring-2 focus:ring-blue-500 text-sm leading-relaxed"
            rows={1}
            style={{
              lineHeight: "1.5rem",
              maxHeight: "6rem",
              overflowY: "auto",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!message.trim()}
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
