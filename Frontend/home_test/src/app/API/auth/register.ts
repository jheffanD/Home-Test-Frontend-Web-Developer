import type { NextApiRequest, NextApiResponse } from "next";
import { signup } from "@/lib/firebase/services";


type data = {
  status: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<data>
) {
  if (req.method === "POST") {
    try {
      await signup(req.body, (status: boolean, result: { message: string }) => {
        if (status) {
          res.status(200).json({ status: true, message: result.message });
        } else {
          res.status(400).json({ status: false, message: result.message });
        }
      });
    } catch (error) {
      res.status(500).json({ status: false, message: "Server error" });
    }
  } else {
    res.status(405).json({ status: false, message: "Method not allowed" });
  }
}
