"use client";

import Image from "next/image";
import { Contact } from "./MessagesPage";

interface ContactsListProps {
  contacts: Contact[];
  selectedContact: Contact;
  onSelectContact: (contact: Contact) => void;
}

export default function ContactsList({
  contacts,
  selectedContact,
  onSelectContact,
}: ContactsListProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          onClick={() => onSelectContact(contact)}
          className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors ${
            selectedContact.id === contact.id ? "bg-gray-700" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                width={100}
                height={100}
                src={contact.avatar || "/placeholder.svg"}
                alt={contact.name}
                className="w-12 h-12 rounded-full"
              />
              {contact.isOnline && (
                <div className="absolute bottom-0 left-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-white truncate">
                  {contact.name}
                </h3>
                <span className="text-xs text-gray-400">{contact.time}</span>
              </div>
              <p className="text-sm text-gray-400 truncate">
                {contact.lastMessage}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
