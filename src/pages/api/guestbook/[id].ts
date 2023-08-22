import { NextApiResponse, NextApiRequest } from "next";
import dbConnect from "@/lib/dbConnect";
import GuestBook from "@/models/GuestBook";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    if (!req.query.id) return res.status(400).json({ message: "Failed, ID Query is Required!" });

    const guestBook = await GuestBook.findById(req.query.id);

    if (!guestBook) return res.status(404).json({ message: `Failed, Guest Book with ID of ${req.query.id} not found!` });

    return res.status(200).json({ data: guestBook });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
