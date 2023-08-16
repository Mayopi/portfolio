import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import GuestBook from "@/models/GuestBook";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    const guestBooks = await GuestBook.find();
    return res.status(200).json({ data: guestBooks });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
