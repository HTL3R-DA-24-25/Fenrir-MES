import "@next/env"
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  res.setHeader('Set-Cookie', `token=; Path=/; HttpOnly; SameSite=Strict`);
  res.appendHeader('Set-Cookie', `JSESSIONID=; Path=/; HttpOnly; SameSite=Strict`);
  res.status(200).json({ message: "Removed cookie" });
}