import User from "../models/User.js";

export const getNotifications = async (req, res) => {
  const user = await User.findById(req.user._id)
    .select("notifications")
    .populate("notifications.project", "name")
    .populate("notifications.task", "title");
  res.json(user.notifications || []);
};

export const markAsRead = async (req, res) => {
  const { notificationId } = req.params;
  await User.updateOne(
    { _id: req.user._id, "notifications._id": notificationId },
    { $set: { "notifications.$.read": true } }
  );
  res.json({ message: "Marked as read" });
};
