import { Schema, model, models } from "mongoose";

interface GuestBookUser {
  name: string;
  email: string;
  image: string;
}

interface GuestBookDocument extends Document {
  title: string;
  content: string;
  encoding: string;
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
    encoding: {
      type: String,
      default: "base64",
    },

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
