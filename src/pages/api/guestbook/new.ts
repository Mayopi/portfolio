import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import GuestBook from "@/models/GuestBook";
import { decodeBase64, encodeBase64 } from "@/lib/base64";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    if (req.method !== "POST") {
      return res.status(400).json({
        message: "Failed",
        code: 400,
        error: "Only POST Request are Allowed.",
      });
    }

    const { title, content, owner } = req.body;

    if (!title || !content || !owner) {
      return res.status(400).json({
        message: "Failed",
        code: 400,
        error: "Title, Content & Owner field are required.",
      });
    }

    const encodedContent: string = encodeBase64(content);

    const data = await GuestBook.create({
      owner,
      title,
      content: encodedContent,
      encoding: "base64",
    });

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
