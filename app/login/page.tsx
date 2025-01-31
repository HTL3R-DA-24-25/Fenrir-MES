"use client";
import { useState, useEffect } from "react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
    const router = useRouter();
    const [darkMode, setDarkMode] = useState(false);
    
    useEffect(() => {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setDarkMode(prefersDark);
      }, []);

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get("username");
        const password = formData.get("password");
        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            router.push("../dashboard");
        } else {
            alert("Invalid credentials");
        }
    }

    return (
    <div className={`flex items-center justify-center min-h-screen dark:bg-gray-900 bg-gray-100`}>
      <Card className={`w-96 p-6 shadow-lg rounded-2xl dark:bg-gray-800 text-white bg-white`}>
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold dark:text-white text-black">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label htmlFor="username" className="dark:text-white text-black">Email</Label>
              <Input
                id="username"
                type="username"
                name="username"
                required
                placeholder="Enter your username"
                className={"dark:bg-gray-700 dark:text-white bg-gray-100 text-black"}
              />
            </div>
            <div>
              <Label htmlFor="password" className="dark:text-white text-black">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                required
                placeholder="Enter your password"
                className={"dark:bg-gray-700 dark:text-white bg-gray-100 text-black"}
              />
            </div>
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}