import "@next/env"
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { username, password } = req.body;
  const { USER, PWD } = process.env;
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  if (!USER || !PWD) {
    return res.status(500).json({ error: 'USER and PWD are not set' });
  }

  if (username !== USER) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const isValidPassword = await bcrypt.compare(password, await bcrypt.hash(PWD, 10));
  if (!isValidPassword) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  if (!JWT_SECRET) {
    return res.status(500).json({ error: 'JWT_SECRET is not set' });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '4h' });
  //console.log('token2', token);
  res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; SameSite=Strict`);
  res.status(200).json({ message: "Set cookie" });
}