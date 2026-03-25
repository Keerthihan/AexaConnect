import { Link, useNavigate } from "react-router-dom";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#415a77] bg-[#0d1b2a]/95 text-[#e0e1dd] backdrop-blur-xl">
      <div className="container mx-auto h-16 px-4">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 transition-all hover:opacity-80"
            >
              <div className="flex size-9 items-center justify-center rounded-lg bg-[linear-gradient(135deg,_#c6ac8f,_#81b29a)] shadow-[0_10px_24px_rgba(129,178,154,0.28)]">
                <MessageSquare className="h-5 w-5 text-[#0d1b2a]" />
              </div>
              <h1 className="text-lg font-bold text-[#e0e1dd]">AexaConnect</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/settings"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#415a77] bg-[#1b263b] px-3 text-sm font-medium text-[#e0e1dd] transition-colors hover:border-[#5b8e7d] hover:bg-[#3d405b]"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#415a77] bg-[#1b263b] px-3 text-sm font-medium text-[#e0e1dd] transition-colors hover:border-[#5b8e7d] hover:bg-[#3d405b]"
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  type="button"
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#c6ac8f] bg-[#c6ac8f] px-3 text-sm font-semibold text-[#0d1b2a] transition-colors hover:bg-[#81b29a] hover:border-[#81b29a]"
                  onClick={handleLogout}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
