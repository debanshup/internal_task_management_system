"use client";

import React from "react";
import SignupForm from "../ui/components/SignupForm";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const Page = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // declare validators

  async function createAccountHandler(e) {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Validate password length
    const passwordValidator = /^.{4,}$/;
    if (!passwordValidator.test(user.password)) {
      alert("Password must be at least 4 characters long");
      return;
    }
    try {
      const signupRes = await axiosInstance.post("employees/signup", user);
      if (signupRes.data.success) {
        alert(signupRes.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <SignupForm
        user={user}
        setUser={setUser}
        createAccountHandler={createAccountHandler}
      />
    </div>
  );
};

export default Page;
