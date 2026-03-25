import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersforSlider = async (req, res) => {
  try {
    const loginUserId = req.user._id;

    const filteredUsers = await User.find({ _id: { $ne: loginUserId } }).select(
      "-password"
    );

    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersforSlider controller:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessage controller:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const sentMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload base64 image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // TODO: realtime functionality goes here => socket.io
    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in sending message", error.message);
    return res.status(500).json({ message: "internal server error" });
  }
};
