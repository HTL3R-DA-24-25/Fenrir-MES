"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    function logout() {
        fetch("/api/logout", { method: "POST" })
            .then((response) => response.text())
            .catch((error) => console.error("Error deleting token cookie:", error));
        router.push("../login");
    }

    const [darkMode, setDarkMode] = useState(false);
    const [isMounted, setIsMounted] = useState(false); // Because fuck next.js complaining about unequal rendering

    useEffect(() => {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setDarkMode(prefersDark);
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    if (!isMounted) {
        return null;
    }

    return (
        <div className={darkMode ? "dark" : ""}>
            <header className="flex justify-between items-center p-4 shadow-md bg-gray-300 dark:bg-gray-800">
                <h1 className="text-lg font-semibold">Fenrir - MES</h1>
                <div>
                    <button onClick={() => logout()} className="p-2 rounded-md bg-gray-200 dark:bg-gray-600 mr-5">
                        Logout
                    </button>
                    <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-md bg-gray-200 dark:bg-gray-600">
                        {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
                    </button>
                </div>
            </header>
            {children}
        </div>
    );
}
