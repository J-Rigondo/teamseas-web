import type { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);
  res.status(200).json({ name: "John Doe" });
};

export default handler;
