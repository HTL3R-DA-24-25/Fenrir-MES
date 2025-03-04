"use client";

export async function loginScada() {
    await fetch("/api/scada/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
}

export async function getAllDatapoints() {
    const response = await fetch("/api/scada/datapoints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
    if(response.status === 401) {
        await loginScada();
        return getAllDatapoints();
    }
    return response.json();
}

export async function getValueOfDatapoint(xid: string) {
    const response = await fetch(`/api/scada/point_value?xid=${xid}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    if(response.status === 401) {
        await loginScada();
        return getValueOfDatapoint(xid);
    }
    console.log(await response.json())
    return response.json();
}