import { useEffect, useState } from "react";
import { auth } from "./firebase/FirebaseConfig";
import NotificationButton from "./components/NotificationButton";
import NotificationList from "./pages/notification/NotificationList";
import AnonymouslyLogin from "./auth/AnonymouslyLogin";

const App: React.FC = () => {
  const [user, setUser] = useState(null);


  const signOutUser = () => {
    auth.signOut()
      .then(() => {
        console.log('User signed out successfully.');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 text-slate-800">
      {user ? (
        <>
          <div className="relative w-full flex items-center justify-center">
            <span className="absolute right-2 top-4">
              <button
                onClick={signOutUser}
                className="bg-gradient-to-r from-rose-500 to-purple-600 text-white py-2 px-4 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 w-full"
              >
                Logout
              </button>
            </span>
            <div className="space-x-4">
              <NotificationButton message="Notification 1"  />
              <NotificationButton message="Notification 2"  />
              <NotificationButton message="Notification 3"  />
            </div>
          </div>
          <NotificationList   />
        </>
      ) : (
        <AnonymouslyLogin />
      )}
    </div>
  );
};

export default App;
