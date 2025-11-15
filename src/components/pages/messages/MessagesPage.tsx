"use client";

import { useState } from "react";
import ChatHeader from "./ChatHeader";
import ContactsList from "./ContactsList";
import Image from "next/image";
import ChatArea from "./ChatArea";
import MessageInput from "./MessageInput";

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  isOnline: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

export default function MessagesPage() {
  const [contacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Person",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "How are you?",
      time: "7 am",
      isOnline: true,
    },
    {
      id: "2",
      name: "Person",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "How are you?",
      time: "7 am",
      isOnline: false,
    },
    {
      id: "3",
      name: "Person",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "How are you?",
      time: "7 am",
      isOnline: true,
    },
    {
      id: "4",
      name: "Person",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "How are you?",
      time: "7 am",
      isOnline: false,
    },
  ]);

  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "1",
      content: "Hello",
      timestamp: new Date(),
      isOwn: false,
    },
    {
      id: "2",
      senderId: "me",
      content: "Hello",
      timestamp: new Date(),
      isOwn: true,
    },
    {
      id: "3",
      senderId: "1",
      content: "Hello",
      timestamp: new Date(),
      isOwn: false,
    },
    {
      id: "4",
      senderId: "me",
      content: "Hello",
      timestamp: new Date(),
      isOwn: true,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "me",
      content,
      timestamp: new Date(),
      isOwn: true,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-black rounded-2xl text-white">
      {/* Contacts Sidebar */}
      <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
        <ChatHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <ContactsList
          contacts={filteredContacts}
          selectedContact={selectedContact}
          onSelectContact={setSelectedContact}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-gray-800 p-4 border-b border-gray-700 flex items-center gap-3">
          <Image
            width={100}
            height={100}
            src={selectedContact.avatar || "/placeholder.svg"}
            alt={selectedContact.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold">{selectedContact.name}</h3>
            <p className="text-sm text-gray-400">
              {selectedContact.isOnline ? "متصل الآن" : "غير متصل"}
            </p>
          </div>
        </div>

        {/* Messages Area */}
        <ChatArea messages={messages} />

        {/* Message Input */}
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
