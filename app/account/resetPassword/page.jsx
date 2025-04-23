"use client";

import { Suspense, useEffect, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import styles from "../account.module.css";
import { useAuth } from "@/app/Context/AuthContext";

export default function ResetPasswordPage() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, user?.email);
      setMessage("Reset email sent! Check your inbox.");
    } catch (err) {
      setError(err.message);
    }
  };

  {
    !user && <div className="loader"></div>;
  }
  return (
    <div className={styles.resetContainer}>
      <h2>Reset Password</h2>
      {user && (
        <form onSubmit={handleReset} className={styles.resetForm}>
          <input
            type="email"
            placeholder="Enter your email"
            value={user.email}
            required
            readOnly
            style={{ opacity: "0.7" }}
          />
          <button type="submit">Send Reset Link</button>
        </form>
      )}
      {message && <p className={styles.success}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
