import { firestoreApp } from "../firebase/FirebaseConfig";

// Adding a new doc to the firebase store
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

// Update the status for toast in the firebase
export const markToastShown = async (id: string) => {
  await firestoreApp
    .collection("notifications")
    .doc(id)
    .update({ toast: false });
};

// Update the status for mark as read in the firebase
export const markAsRead = async (id: string) => {
  await firestoreApp
    .collection("notifications")
    .doc(id)
    .update({ read: true });
};
