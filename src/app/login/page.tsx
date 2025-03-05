"use client";

import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import LoginForm from "../ui/components/LoginForm";
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "user",
  });

  async function loginHandler(e) {
    e.preventDefault();
    try {
      if (user.role === "user") {
        const loginRes = await axiosInstance.post("employees/login", user);
        if (loginRes.data.success) {
          router.push("/tasks");
        }
      } else if (user.role === "admin") {
        // alert(user.role)
        const loginRes = await axiosInstance.post("manager/login", user);
        if (loginRes.data.success) {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong, try again"
      );
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm user={user} setUser={setUser} loginHandler={loginHandler} />
    </div>
  );
};

export default Page;
