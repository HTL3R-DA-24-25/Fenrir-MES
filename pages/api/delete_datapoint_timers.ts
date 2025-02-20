import { NextApiRequest, NextApiResponse } from "next";
import { deleteDatapointTimer } from "./datapoint_timers";

export default function handler(request: NextApiRequest, response: NextApiResponse) {
    deleteDatapointTimer(request.body.index);
    response.status(200).json({ message: "Timer removed" });
}
