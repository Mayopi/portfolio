import { Schema, model, models } from "mongoose";

interface GuestBookUser {
  name: string;
  email: string;
  image: string;
}

interface GuestBookDocument extends Document {
  title: string;
  content: string;
  owner: GuestBookUser;
  upvotes: {
    users: GuestBookUser[];
    count: number;
  };
}

const GuestBookSchema = new Schema(
  {
    title: String,
    content: String,
    owner: {
      name: String,
      email: String,
      image: String,
    },
  },
  { timestamps: true }
);

const GuestBook = models.GuestBook || model<GuestBookDocument>("GuestBook", GuestBookSchema);

export default GuestBook;
