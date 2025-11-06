"use client";
import { useEffect, useRef } from "react";
import { Message } from "./MessagesPage";

interface ChatAreaProps {
  messages: Message[];
}

export default function ChatArea({ messages }: ChatAreaProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ar-SA", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.isOwn ? "justify-start" : "justify-end"}`}
        >
          <div
            className={`max-w-xs text-pretty lg:max-w-md px-4 py-2 rounded-2xl ${
              message.isOwn
                ? "bg-blue-600 text-white rounded-br-sm"
                : "bg-gray-600 text-white rounded-bl-sm"
            }`}
          >
            <p
              className="text-sm break-words whitespace-pre-wrap leading-relaxed"
              dangerouslySetInnerHTML={{ __html: message.content }}
            ></p>
            <p
              className={`text-xs mt-1 ${
                message.isOwn ? "text-blue-100" : "text-gray-400"
              }`}
            >
              {formatTime(message.timestamp)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
