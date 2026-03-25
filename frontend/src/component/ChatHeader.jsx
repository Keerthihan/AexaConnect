import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";

const ChatHeader = () => {
  const { selectedUser, setSelecteduser } = useChatStore();
  const { onlineusers = [] } = useAuthStore();

  if (!selectedUser) {
    return null;
  }

  const displayName = selectedUser.fullName || selectedUser.fullname || "User";
  const isOnline = onlineusers.includes(selectedUser._id);

  return (
    <div className="border-b border-white/8 bg-transparent px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="relative size-12 rounded-2xl ring-1 ring-white/10">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={displayName}
                className="rounded-2xl object-cover"
              />
              <span
                className={`absolute bottom-1 right-1 size-3 rounded-full ring-2 ring-[#08111f] ${isOnline ? "bg-[#7dd3a7]" : "bg-[#62748a]"}`}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#f5efe6]">{displayName}</h3>
            <p className="text-sm text-[#93a4b7]">
              {isOnline ? "Online now" : "Currently offline"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSelecteduser(null)}
          className="inline-flex size-10 items-center justify-center rounded-2xl text-[#d8e1ea] transition hover:bg-white/5"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
