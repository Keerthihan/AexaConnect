import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
import { useAuthStore } from './useAuthStore.js';

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isLoadingMessages: false,
    isMessagesLoading: false,
    isLoadingUsers: false,

    getUsers: async () => {
        set({ isLoadingUsers: true });
        try {
            const response = await axiosInstance.get('/messages/users');
            set({ users: response.data });
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Error fetching users');
        } finally {
            set({ isLoadingUsers: false });
        }
    },
    getMessages: async (userId) => {
        set({ isLoadingMessages: true, isMessagesLoading: true });
        try {
            const response = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: response.data });
        } catch (error) {
            console.error('Error fetching messages:', error);
            toast.error('Error fetching messages');
        } finally {
            set({ isLoadingMessages: false, isMessagesLoading: false });
        }
    },
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();

        if (!selectedUser?._id) return;

        try {
            const res = await axiosInstance.post(
                `/messages/sent/${selectedUser._id}`,
                messageData
            );
            set({ messages: [...messages, res.data] });
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error(error.response?.data?.message || 'Error sending message');
            throw error;
        }
    },
    setSelecteduser: (selectedUser) => {
        set({ selectedUser });
    },
    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().Socket;
        if (!socket) return;

        socket.off("new-message");
        socket.on("new-message", (newMessage) => {
            if (newMessage.senderId !== selectedUser._id) return;

            set({
                messages: [...get().messages, newMessage]
            });
        });
    },
    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().Socket;
        if (!socket) return;

        socket.off("new-message");
    }
}
));
