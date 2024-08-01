import {
  collection,
  getDocs,
} from "firebase/firestore";
import { firestoreApp } from "../firebase/FirebaseConfig";

export const sendNotification = async (message: String) => {
  var d1 = new Date();
  d1.toUTCString();
  let messageText = `Hey - You have clicked ${message}`;
  await firestoreApp.collection("notifications").add({
    messageText,
    read: false,
    toast: true,
    createdAt: Math.floor(d1.getTime() / 1000),
  });
};

export const markToastShown = async (id: string) => {
  await firestoreApp
    .collection("notifications")
    .doc(id)
    .update({ toast: false });
};

export const markAsRead = async (id: string) => {
  await firestoreApp
    .collection("notifications")
    .doc(id)
    .update({ read: true });
};




export const getNotifications = async () => {
  const querySnapshot = await getDocs(
    collection(firestoreApp, "notifications")
  );
  const notifications: any[] = [];
  querySnapshot.forEach((doc) => {
    notifications.push({ id: doc.id, ...doc.data() });
  });
  return notifications;
};
