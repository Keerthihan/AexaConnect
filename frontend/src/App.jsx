import Navbar from "./component/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import Setting from "./pages/Setting.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore.js";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth ,onlineusers} = useAuthStore();
  console.log("Online users:", onlineusers);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d1b2a] text-[#e0e1dd]">
        <Loader className="size-10 animate-spin" />
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-[#e0e1dd]">
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
          <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/settings" element={<Setting />} />
        </Routes>
      </main>
      <Toaster />
    </div>
  );
};

export default App;
