import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { FaBookReader } from "react-icons/fa";
import { BiUpvote, BiSolidUpvote } from "react-icons/bi";
import { MdArticle } from "react-icons/md";
import useSWR from "swr";
import ReactMarkdown from "markdown-to-jsx";
import CodeBlock from "@/components/CodeBlock";
import { Document } from "mongoose";

interface GuestBookUser {
  name: string;
  email: string;
  image: string;
}

interface GuestBookDocument extends Document {
  title: string;
  content: string;
  encoding: string;
  updatedAt: string;
  owner: GuestBookUser;
  upvotes: {
    users: GuestBookUser[];
    count: number;
  };
}

const GuestBookItem: React.FC<{ user: string; date: string; _id: string; title: string; content: string; key: number }> = ({ user, title, content, date, _id, key }): React.ReactNode => {
  return (
    <div className="gb-item w-full flex flex-col gap-3" key={key}>
      <header className="header flex gap-2 items-center w-full">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <Image src="https://lh3.googleusercontent.com/a/AAcHTtc9j4M-wjVg4UiRg4oz03fJMHvmaDv9daahTPmQ7pXuFnY=s96-c" width={40} height={40} alt="user profile" />
          </div>
        </div>
        <h3 className="text-lg">
          <span className="font-semibold">{user}</span> <span className="opacity-50 text-base">Posted a Guest Book &#x2022; {date}</span>
        </h3>
      </header>

      <Link href={`/guestbook/${_id}`} className="cursor-pointer w-full">
        <div className="body p-3 shadow w-full rounded-lg bg-base-200 mr-5">
          <h1 className="mb-2 font-semibold text-lg text-primary">{title}</h1>
          <article className="min-w-full prose lg:prose-lg">
            <ReactMarkdown
              options={{
                overrides: {
                  code: {
                    component: CodeBlock,
                  },
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </article>

          <div className="footer mt-3 flex gap-5">
            <Link href={`/guestbook/${user.split(" ").join("-").toLowerCase()}`}>
              <p className="hover:link link-info">View Guestbooks</p>
            </Link>
            <button className="text-lg">
              <BiUpvote />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const GuestBook: React.FC = (): React.ReactNode => {
  const { data: session, status } = useSession();

  const { data: { data } = {}, error: guestbooks_error, isLoading: guestbook_loading } = useSWR(`/api/guestbook`, fetcher);

  if (guestbook_loading) return <div>Loading..</div>;
  if (guestbooks_error) return <div>error</div>;

  if (data) {
    console.log(data);
  }

  return (
    <>
      <Head>
        <title>Portfolio - Guestbook</title>
      </Head>
      <main className="mx-5 pb-24 lg:mx-16">
        <Navbar />

        <header className="w-full flex justify-center items-center">
          <h1 className="lg:text-2xl text-xl font-semibold mx-auto uppercase tracking-wide flex justify-center items-center gap-2">
            <FaBookReader className="inline" />
            Guestbooks
          </h1>

          <Link href={"/guestbook/new"}>
            <button className="btn btn-primary btn-outline p-2">
              <MdArticle className="text-2xl" /> Create Your Own
            </button>
          </Link>
        </header>

        <section className="guestbook my-10 lg:mx-56 mx-2 flex flex-wrap gap-6">
          {data.map((guestbook: GuestBookDocument, index: number) => (
            <GuestBookItem title={guestbook.title} content={Buffer.from(guestbook.content, "base64").toString()} user={guestbook.owner.name} date={guestbook.updatedAt} _id={guestbook._id} key={index} />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default GuestBook;
