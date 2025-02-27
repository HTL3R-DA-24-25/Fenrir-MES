import { NextApiRequest, NextApiResponse } from "next";
import { addDatapointTimer } from "./datapoint_timers";

export default function handler(request: NextApiRequest, response: NextApiResponse) {
    addDatapointTimer(request.body, request.headers.host as string);
    response.status(200).json({ message: "Timer added" });
}
