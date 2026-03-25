import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

const normalizeUser = (user) => {
  if (!user) return null;

  return {
    ...user,
    fullName: user.fullName ?? user.fullname ?? "",
  };
};

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineusers:[],

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: normalizeUser(response.data) });
    } catch (error) {
      if (error.response) {
        console.error("Error checking auth:", error);
      }
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const payload = {
        email: data.email,
        password: data.password,
        fullname: data.fullName,
      };

      const response = await axiosInstance.post("/auth/signup", payload);
      set({ authUser: normalizeUser(response.data) });
      toast.success("Signup successful!");
    } catch (error) {
      if (!error.response) {
        toast.error("Cannot reach the server at http://localhost:5001");
      } else {
        toast.error(error.response?.data?.message || "Error signing up");
      }
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: normalizeUser(response.data) });
      toast.success("Logged in successfully!");
    } catch (error) {
      if (!error.response) {
        toast.error("Cannot reach the server at http://localhost:5001");
      } else {
        toast.error(error.response?.data?.message || "Error logging in");
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error logging out");
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: normalizeUser(res.data) });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
