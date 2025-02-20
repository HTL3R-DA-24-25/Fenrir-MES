import { NextApiRequest, NextApiResponse } from "next";
import { getDatapointTimers } from "./datapoint_timers";

export default function handler(request: NextApiRequest, response: NextApiResponse) {
    const allTimers = getDatapointTimers();
    response.status(200).json(allTimers);
}
