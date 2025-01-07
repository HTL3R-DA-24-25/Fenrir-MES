import type { NextApiRequest, NextApiResponse } from 'next'
import "@next/env"

type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  
  res.status(200).json({ message: ""+process.env.SCADA_PWD })
}