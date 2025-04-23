"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import Swal from "sweetalert2";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Logged In Successfully",
        showConfirmButton: false,
        timer: 1000,
      });
      router.push("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid Email Or Password !",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="signup-link">
        Don't have an account?{" "}
        <span onClick={() => router.push("/sign-up")}>Sign up here</span>
      </p>
    </div>
  );
}
