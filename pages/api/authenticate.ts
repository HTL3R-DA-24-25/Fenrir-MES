import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(request: NextApiRequest, response: NextApiResponse) {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const { JWT_SECRET } = process.env;

    if (!token) {
        console.log("no token provided");
        return response.status(401).json({ message: "Access Denied: No Token Provided" });
    }
    if (!JWT_SECRET) {
        console.log("no jwt secret set");
        return response.status(500).json({ message: "Access Denied: No JWT Secret Configured" });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return response.status(401).json({ message: "Access Denied: Invalid Token" });
        } else {
            return response.status(200).json({ message: "Access Granted: Valid Token" });
        }
    });
}
