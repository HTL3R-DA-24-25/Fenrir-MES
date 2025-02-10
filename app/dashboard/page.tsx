"use client";

import { getAllDatapoints, loginScada } from "@/pages/api-handler";

async function handleLogin() {
  try {
    await loginScada();    
    console.log(await getAllDatapoints());
  } catch (error) {
    console.error("Error logging in:", error);
  }
}
handleLogin();

export default function Dashboard() {
  return (
    <div
      className={`flex items-center justify-center min-h-screen dark:bg-gray-900 bg-gray-100`}
    >
      <div>DASHBOARD</div>
    </div>
  );
}
