import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_BASE_URL = process.env.SCADA_API_BASE_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
    const { xid, value } = req.body;
    if (req.headers.cookie === undefined || !req.headers.cookie.includes("JSESSIONID")) {
        return res.status(401).json({ error: "No cookie found in request headers" });
    }
    const cookie = "JSESSIONID=" + req.headers.cookie?.split("JSESSIONID=")[1].split(";")[0].trim();
    if (cookie === undefined || cookie === "JSESSIONID=") {
        return res.status(401).json({ error: "No cookie found in request headers" });
    }

    try {
        const on = value ? 1 : 0;
        console.log(`${API_BASE_URL}/point_value/setValue/${xid}/1/${on}` )
        const response = await axios.get(`${API_BASE_URL}/point_value/setValue/${xid}/1/${on}`, {
            headers: { Cookie: cookie },
        });
        if(on === response.data) {
            res.status(200).json({ message: "Data point set" });
        } else {
            console.log(response.data);
            res.status(500).json({ error: "Error setting data point" });
        }
    } catch{
        res.status(500).json({ error: "Error setting data point" });
    }
}
