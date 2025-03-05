"use client"
import axiosInstance from "./utils/axiosInstance";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  return (
<div>
  <div>
    <a href="/signup">Sign Up</a>
    <br />
    <a href="/login">log in</a>
  </div>
</div>
  );
}
