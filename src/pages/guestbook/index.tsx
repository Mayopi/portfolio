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

const GuestBookItem: React.FC<{ user: string; date: string; title: string; content: string }> = ({ user, title, content, date }): React.ReactNode => {
  return (
    <div className="gb-item w-full flex flex-col gap-3">
      <div className="header flex gap-2 items-center w-full">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <Image src="https://lh3.googleusercontent.com/a/AAcHTtc9j4M-wjVg4UiRg4oz03fJMHvmaDv9daahTPmQ7pXuFnY=s96-c" width={40} height={40} alt="user profile" />
          </div>
        </div>
        <h3 className="text-lg">
          <span className="font-semibold">{user}</span> <span className="opacity-50 text-base">Posted a Guest Book &#x2022; {date}</span>
        </h3>
      </div>

      <Link href={`/guestbook/${title.split(" ").join("-").toLowerCase()}`} className="cursor-pointer">
        <div className="body p-3 shadow w-full rounded-lg bg-base-200 mr-5">
          <h1 className="mb-2 font-semibold text-lg">{title}</h1>
          <p>{content}</p>

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

const GuestBook: React.FC = (): React.ReactNode => {
  const { data, status } = useSession();
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
            <button className="btn btn-primary btn-outline text-2xl p-2 aspect-square">
              <MdArticle />
            </button>
          </Link>
        </header>

        <section className="guestbook my-10 lg:mx-56 mx-10 flex flex-wrap gap-6">
          <GuestBookItem
            user="Ocha"
            date="Last Week"
            title="Book Title"
            content="
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur at facere praesentium? Expedita, tempora. Modi vel dolore accusantium magni inventore repellendus temporibus minima placeat necessitatibus, reprehenderit veritatis? Beatae, perspiciatis ipsum."
          />
          <GuestBookItem
            user="Ocha"
            date="Last Week"
            title="hello this is test mothafaking title"
            content="
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur at facere praesentium? Expedita, tempora. Modi vel dolore accusantium magni inventore repellendus temporibus minima placeat necessitatibus, reprehenderit veritatis? Beatae, perspiciatis ipsum."
          />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default GuestBook;
