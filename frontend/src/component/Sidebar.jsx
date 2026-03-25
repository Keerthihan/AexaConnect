import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/sidebarSkeletons.jsx";
import { Sparkles, Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelecteduser, isUsersLoading } = useChatStore();

  const { onlineusers: onlineUsers = [] } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="glass-panel h-full w-20 border-r-0 rounded-l-[28px] sm:w-24 lg:w-[340px]">
      <div className="flex h-full flex-col">
        <div className="border-b border-white/10 p-4 lg:p-6">
          <div className="flex items-center justify-center lg:justify-between">
            <div className="hidden lg:block">
              <p className="text-xs uppercase tracking-[0.35em] text-[#93a4b7]">
                Conversations
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[#f5efe6]">People</h2>
            </div>
            <div className="flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_rgba(224,179,109,0.2),_rgba(100,210,214,0.18))] text-[#f5efe6] shadow-[0_18px_30px_rgba(0,0,0,0.18)]">
              <Users className="size-6" />
            </div>
          </div>

          <div className="mt-5 hidden rounded-3xl border border-white/10 bg-white/5 p-3 lg:block">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex size-9 items-center justify-center rounded-2xl bg-[rgba(100,210,214,0.12)] text-[#64d2d6]">
                <Sparkles className="size-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#f5efe6]">
                  Active now
                </p>
                <p className="mt-1 text-xs leading-5 text-[#93a4b7]">
                  {Math.max(onlineUsers.length - 1, 0)} people ready to chat right now.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 hidden lg:flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0d1828]/80 px-3 py-2.5">
            <label className="flex cursor-pointer items-center gap-3 text-sm text-[#d8e1ea]">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="checkbox checkbox-sm border-white/20 [--chkbg:#64d2d6] [--chkfg:#08111f]"
              />
              <span>Show online only</span>
            </label>
            <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-[#93a4b7]">
              {filteredUsers.length} shown
            </span>
          </div>
        </div>

        <div className="overflow-y-auto px-2 py-3 lg:px-3">
          {filteredUsers.map((user) => {
            const displayName = user.fullName || user.fullname || "Unknown User";
            const isOnline = onlineUsers.includes(user._id);
            const isSelected = selectedUser?._id === user._id;

            return (
              <button
                key={user._id}
                onClick={() => setSelecteduser(user)}
                className={`
                  mb-2 flex w-full items-center gap-3 rounded-3xl px-3 py-3 text-left transition-all duration-200
                  ${isSelected
                    ? "bg-[linear-gradient(135deg,_rgba(224,179,109,0.18),_rgba(100,210,214,0.14))] shadow-[0_12px_24px_rgba(0,0,0,0.18)] ring-1 ring-white/10"
                    : "hover:bg-white/5"
                  }
                `}
              >
                <div className="relative mx-auto shrink-0 lg:mx-0">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={displayName}
                    className="size-12 rounded-2xl object-cover ring-1 ring-white/10"
                  />
                  {isOnline && (
                    <span
                      className="absolute bottom-0 right-0 size-3 rounded-full bg-[#7dd3a7] ring-2 ring-[#08111f]"
                    />
                  )}
                </div>

                <div className="hidden min-w-0 flex-1 lg:block">
                  <div className="flex items-center justify-between gap-3">
                    <div className="truncate font-medium text-[#f5efe6]">{displayName}</div>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${isOnline ? "bg-[rgba(125,211,167,0.14)] text-[#7dd3a7]" : "bg-white/5 text-[#93a4b7]"}`}>
                      {isOnline ? "Online" : "Offline"}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-[#93a4b7]">
                    {isSelected ? "Current conversation" : isOnline ? "Available to reply" : "Last seen recently"}
                  </div>
                </div>
              </button>
            );
          })}

          {filteredUsers.length === 0 && (
            <div className="mx-2 mt-6 rounded-3xl border border-dashed border-white/10 bg-white/5 px-4 py-8 text-center text-sm text-[#93a4b7]">
              No matching users right now.
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
