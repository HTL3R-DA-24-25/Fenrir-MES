import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_BASE_URL = process.env.SCADA_API_BASE_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { username, password } = req.body;
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/${username}/${password}`, { withCredentials: false });
    if(response.headers["set-cookie"] === undefined || response.headers["set-cookie"][0] === undefined) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const header = response.headers["set-cookie"][0].split(";")[0] += "; Path=/; HttpOnly; SameSite=Strict";
    // console.log("login headers", header);
    // console.log("login headers", response.headers["set-cookie"][0].split(";")[1] = "Path=/; HttpOnly; SameSite=Strict"  );
    res.setHeader("Set-Cookie", header);
    res.status(200).json({ message: "Set cookie" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in" });
  }
}
