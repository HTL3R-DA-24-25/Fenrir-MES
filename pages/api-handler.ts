"use client";
let scadaToken: string = "";

export async function loginScada() {
    const response = await fetch("/api/scada/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "admin", password: "admin" }),
    });
}

export async function getAllDatapoints() {
    const response = await fetch("/api/scada/datapoints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: scadaToken }),
    });
    if(response.status === 401) {
        await loginScada();
        return getAllDatapoints();
    }
    return response.json();
}
