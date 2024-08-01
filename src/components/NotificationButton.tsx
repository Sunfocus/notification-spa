import React from "react";
import { sendNotification } from "../service/NotificationService";

interface NotificationButtonProps {
  message: string;
}

// This is a component of notification button where the notification fires!
const NotificationButton: React.FC<NotificationButtonProps> = ({ message }) => {
  return (
    <button
      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      onClick={()=> sendNotification(message)}
    >
      {message}
    </button>
  );
};

export default NotificationButton;
