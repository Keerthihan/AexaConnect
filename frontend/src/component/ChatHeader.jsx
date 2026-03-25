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
    <div className="border-b border-base-300 p-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="relative size-10 rounded-full">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={displayName}
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium">{displayName}</h3>
            <p className="text-sm text-base-content/70">
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <button type="button" onClick={() => setSelecteduser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
