import { getAllDataPoints, loginUser } from "@/pages/scada-handler";

async function handleLogin() {
  try {
    await loginUser("admin", "admin");
    const data = await getAllDataPoints();
    // console.log("Data points:", data);
  } catch (error) {
    console.error("Error logging in:", error);
  }
}

export default function Dashboard() {
  handleLogin();
  return (
    <div
      className={`flex items-center justify-center min-h-screen dark:bg-gray-900 bg-gray-100`}
    >
      <div>DASHBOARD</div>
    </div>
  );
}
