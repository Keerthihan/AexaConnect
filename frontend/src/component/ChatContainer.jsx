import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./Messageinput.jsx";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-[#0b1422]">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#0b1422]">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-5">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="relative size-10 overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                  className="size-full object-cover"
                />
              </div>
            </div>
            <div className="chat-header mb-2">
              <time className="ml-1 text-[11px] uppercase tracking-[0.2em] text-[#7f90a4]">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div
              className={`chat-bubble flex max-w-[min(85vw,32rem)] flex-col rounded-[24px] border px-4 py-3 text-sm leading-6 shadow-[0_12px_28px_rgba(0,0,0,0.18)] ${
                message.senderId === authUser._id
                  ? "border-[rgba(100,210,214,0.18)] bg-[linear-gradient(135deg,_rgba(100,210,214,0.22),_rgba(100,210,214,0.08))] text-[#f4fbfb]"
                  : "border-white/10 bg-[rgba(255,255,255,0.06)] text-[#f5efe6]"
              }`}
            >
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="mb-3 rounded-2xl sm:max-w-[240px]"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
        </div>
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
