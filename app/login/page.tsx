"use client";
import { useState } from "react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { loginUser } from "@/pages/scada-handler";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    const { SCADA_USER, SCADA_PWD } = process.env;
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      if (SCADA_USER && SCADA_PWD) loginUser(SCADA_USER, SCADA_PWD);
      router.push("../dashboard");
    } else {
      setError(true);
    }
  }

  return (
    <div
      className={`flex items-center justify-center min-h-screen dark:bg-gray-900 bg-gray-100`}
    >
      <Card
        className={`w-96 p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:text-white text-black bg-white`}
      >
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label htmlFor="username">Email</Label>
              <Input
                id="username"
                type={"password"}
                name="username"
                required
                placeholder="Enter your username"
                className={"dark:bg-gray-700 bg-gray-100"}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                required
                placeholder="Enter your password"
                className={"dark:bg-gray-700 bg-gray-100"}
              />
            </div>
            {error && (
              <Alert className="mb-4" variant="destructive">
                <AlertTitle>
                  <AlertCircle size={24} className="mr-2" />
                  Invalid username or password
                </AlertTitle>
                <AlertDescription>
                  Please check your username and password and try again.
                </AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
