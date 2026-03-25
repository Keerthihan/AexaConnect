import { useChatStore } from "../store/useChatStore";
import Sidebar from "../component/Sidebar.jsx";
import NoChatSelected from "../component/NoChatSelected.jsx";
import ChatContainer from "../component/ChatContainer.jsx";
const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="chat-ambient min-h-screen bg-transparent px-3 pb-3 pt-20 sm:px-4 sm:pb-4">
      <div className="chat-ambient-inner mx-auto flex h-[calc(100vh-6.5rem)] w-full max-w-7xl items-center justify-center">
        <div className="flex h-full w-full overflow-hidden rounded-[28px]">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
      </div>
    </div>
  );
};
export default HomePage;
