import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_BASE_URL = process.env.SCADA_API_BASE_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
    let cookie = req.headers.cookie?.split(";")[1].trim()
    if (cookie === undefined) {
        return res.status(401).json({ error: "No cookie found in request headers" });
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/datapoint/getAll`, {
            headers: { Cookie: cookie },
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data points" });
    }
}
