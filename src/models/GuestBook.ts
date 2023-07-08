import { Schema, model, models } from "mongoose";

interface GuestBookOwner {
  name: string;
  provider: string;
}

interface GuestBookDocument extends Document {
  title: string;
  content: string;
  owner: GuestBookOwner;
}

const GuestBookSchema = new Schema(
  {
    title: String,
    content: String,
    owner: {
      name: String,
      provider: String,
    },
  },
  { timestamps: true }
);

const GuestBook = models.GuestBook || model<GuestBookDocument>("GuestBook", GuestBookSchema);

export default GuestBook;
