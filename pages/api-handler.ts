"use client";
let scadaToken: string = "";

export async function loginScada() {
    const response = await fetch("/api/scada/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "admin", password: "admin" }),
    });
    const data = await response.json();
    scadaToken = data;
    console.log(scadaToken)
}

export async function getAllDatapoints() {
    console.log(scadaToken)
    const response = await fetch("/api/scada/datapoints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: scadaToken }),
    });
    return response.json();
}
