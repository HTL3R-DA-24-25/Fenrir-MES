"use client";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
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
        <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
            <div className="flex items-center justify-center py-12 bg-secondary-600">
                <div className="mx-auto grid max-w-6xl gap-12">
                    <div className="grid gap-2 text-center">
                        <h1>Login</h1>
                    </div>
                    <form onSubmit={submit} className="grid gap-4">
                        <input type="text" name="username" placeholder="Username" />
                        <input type="password" name="password" placeholder="Password" />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
