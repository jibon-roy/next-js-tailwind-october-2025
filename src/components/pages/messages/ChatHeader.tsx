"use client";

import { Search, Trash2 } from "lucide-react";

interface ChatHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function ChatHeader({
  searchQuery,
  onSearchChange,
}: ChatHeaderProps) {
  return (
    <div className="p-4 border-b border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">الرسائل</h1>
        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="البحث..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg py-2 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
