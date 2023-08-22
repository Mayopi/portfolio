import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import useSWR from "swr";
import Image from "next/image";
import ReactMarkdown from "markdown-to-jsx";
import CodeBlock from "@/components/CodeBlock";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const GuestBookId: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, isLoading } = useSWR(id ? `/api/guestbook/${id}` : null, fetcher);
  const guestbook = data?.data;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  console.log(guestbook);

  return (
    <>
      <Head>
        <title>Portfolio</title>
      </Head>
      <main className="mx-5 pb-24 lg:mx-16">
        <Navbar />

        <section className="my-16 rounded p-5 bg-base-200">
          {guestbook?.owner && (
            <header className="header flex gap-2 items-center w-full">
              <div className="avatar">
                <div className="w-10 lg:w-16 rounded-full relative">
                  <Image src={guestbook.owner.image} fill alt="user profile" />
                </div>
              </div>
              <h3 className="text-lg">
                <span className="font-semibold">{guestbook.owner.name}</span> <span className="opacity-50 text-base">Posted a Guest Book &#x2022; {guestbook.createdAt}</span>
              </h3>
            </header>
          )}

          <div className="content prose lg:prose-lg mt-10">
            {guestbook?.content && (
              <ReactMarkdown
                options={{
                  overrides: {
                    code: {
                      component: CodeBlock,
                    },
                  },
                }}
              >
                {Buffer.from(guestbook.content, "base64").toString()}
              </ReactMarkdown>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default GuestBookId;
