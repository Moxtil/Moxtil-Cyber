"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config"; // Update the path as needed

export default function Routing({ children }) {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect to /sign-up if not logged in
        router.push("/sign-up");
      }
    });

    return () => unsub(); // Cleanup listener
  }, []);

  return <>{children}</>; // Render the page content when user is authenticated
}
