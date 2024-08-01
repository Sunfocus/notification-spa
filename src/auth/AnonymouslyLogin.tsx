import React, { useState } from "react";
import { auth } from "../firebase/FirebaseConfig";

// This is the login page for the anonymously users
const AnonymouslyLogin: React.FC = () => {
  const [loading, setLoading] = useState(false); // This is for loading of the login button

  // Here users are created in the firebase auth and logged in to our portal!
  const handleAnonymousLogin = () => {
    setLoading(true);
    setTimeout(() => {
      auth.signInAnonymously().catch((error: object) => {
        console.error("Error signing in anonymously: ", error);
      });
      setLoading(false);
    }, 2000);
  };


  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-lg w-full max-w-sm text-center transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold mb-16 text-gray-800">
          Welcome to Notification App
        </h2>
        <button
          onClick={handleAnonymousLogin}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 w-full"
        >
          {loading ? "Loading..." : "Login Anonymously"}
        </button>
      </div>
    </div>
  );
};

export default AnonymouslyLogin;
