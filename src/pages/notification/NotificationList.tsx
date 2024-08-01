import React, { useEffect, useState } from "react";
import { firestoreApp } from "../../firebase/FirebaseConfig";
import { notification } from "antd";
import { BellFilled } from "@ant-design/icons";
import { convertTimeToLocal } from "../../utils/Utility";
import { markAsRead, markToastShown } from "../../service/NotificationService";


const NotificationList: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [count, setCount] = useState(0);


  const openNotification = (placement: any, data: any) => {
    api.info({
      message: (
        <h1 className="text-md font-bold text-gray-600">Notification</h1>
      ),
      description: (
        <p>
          {data?.messageText}at {convertTimeToLocal(data?.createdAt)}
        </p>
      ),
      placement,
    });
    markToastShown(data?.id);
  };



  useEffect(() => {
    const unsubscribe = firestoreApp
      .collection("notifications")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const notificationsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        notificationsData?.length > 0 &&
          notificationsData?.filter(
            (el: any) => el?.toast && openNotification("topRight", el)
          );

        let c = notificationsData?.filter((el: any) => !el?.read);
        setCount(c?.length);
        setNotifications(notificationsData);
      });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {contextHolder}
      <h2 className="mt-20 mb-10 text-2xl font-semibold">
        <i className="relative mr-6">
          <BellFilled />
          <span className="absolute bottom-4 left-3 text-sm text-white bg-red-600  px-2 rounded-full">
            {count}
          </span>
        </i>
        Notifications Listing
      </h2>
      <ul className="flex flex-col gap-2 pr-1 h-[50vh] w-[50vw] overflow-auto no-scrollbar">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className={`flex justify-between border-b border-gray-300 py-2 px-2 ${
              !notification.read ? "bg-gray-200 font-semibold" : "none "
            }`}
          >
            {notification?.messageText} at{" "}
            {convertTimeToLocal(notification?.createdAt)}
            {!notification.read && (
              <button
                onClick={() => markAsRead(notification.id)}
                className="bg-blue-500 text-white ml-4 py-1 px-3 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
              >
                View
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
