import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_BASE_URL = process.env.SCADA_API_BASE_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
        console.log("as" , req.body.token.split(";")[0]);

    try {
        const response = await axios.get(`${API_BASE_URL}/datapoint/getAll`, {
            headers: { Cookie: req.body.token.split(";")[0] },
        });
        console.log(response.status)
        if (JSON.parse(response.data).error) {
            return res.status(500).json({ error: "Error fetching data points" });
        }
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data points" });
    }
}
