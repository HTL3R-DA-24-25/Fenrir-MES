import { NextApiRequest, NextApiResponse } from "next";
import { addDatapointTimer } from "./datapoint_timers";

export default function handler(request: NextApiRequest, response: NextApiResponse) {
    // console.log(request.body);
    addDatapointTimer(request.body);
    response.status(200).json({ message: "Timer added" });
}
