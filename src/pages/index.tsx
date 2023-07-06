import Head from "next/head";
import { FC, ReactNode } from "react";
import { Raleway } from "next/font/google";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import ScrollProgress from "@/components/ScrollProgress";
import AnimatedWord from "@/components/AnimatedWord";
import { FaPaperPlane, FaFilePdf } from "react-icons/fa";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Projects from "@/components/Projects";
import useSWR from "swr";

const raleway = Raleway({ subsets: ["latin"] });

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Home: FC = (): ReactNode => {
  const { data, error, isLoading } = useSWR("https://api.github.com/users/Mayopi", fetcher);
  const { data: repos, error: repos_error, isLoading: repos_loading } = useSWR(data ? `${data.repos_url}?sort=created&per_page=5` : null, fetcher);

  return (
    <>
      {isLoading || repos_loading ? (
        <div className="loading loading-spinner loading-lg"></div>
      ) : error || repos_error ? (
        <div>Something bad happened {":("}</div>
      ) : (
        <>
          <Head>
            <title>{data.name} - Portfolio</title>
          </Head>
          <ScrollProgress />
          <main className={`${raleway.className} mx-5 pb-24 lg:mx-16`}>
            <Navbar />
            <section className="mt-10 w-full flex flex-wrap" id="particle-container">
              <div className="w-full lg:w-1/2 mb-5">
                <h3 className="text-accent lg:text-xl">Hello Everyone 👋 I&apos;m</h3>
                <h1 className="text-4xl lg:text-6xl font-semibold tracking-wider">{data.name}</h1>
                <blockquote cite="https://github.com/Mayopi" className="mt-2 opacity-70">
                  {data.bio}
                </blockquote>
                <AnimatedWord text="Software Engineer" className="mt-5 lg:text-lg text-secondary" />
                <motion.hr initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }} className="border origin-top-left border-t-2 my-2 max-w-[30%] border-secondary" />
                <p className="lg:text-lg font-extralight">
                  I&apos;m a {new Date().getFullYear() - 2004} year old passionate Tech Enthusiast, constantly exploring the ever-evolving world of technology and seeking innovative solutions. With a deep curiosity and eagerness to learn, I
                  thrive on embracing new challenges and leveraging cutting-edge tools to create impactful and meaningful experiences.
                </p>
                <div className="mt-2 flex gap-3  items-center">
                  <button className="btn btn-primary">
                    Send Message <FaPaperPlane className="inline" />
                  </button>
                  <button className="btn btn-outline btn-primary">
                    Download CV <FaFilePdf className="inline" />
                  </button>
                </div>
              </div>

              <div className="w-full lg:w-1/2 flex items-center justify-center">
                <div className="avatar aspect-square">
                  <div className="w-full rounded-full ring ring-primary bg-base-200">
                    <motion.img
                      initial={{ x: -300, y: 300 }}
                      animate={{ x: 0, y: 0 }}
                      transition={{ delay: 1, type: "spring" }}
                      className="cursor-grab rounded-full"
                      drag
                      whileDrag={{ cursor: "grabbing" }}
                      dragConstraints={{
                        top: -30,
                        left: -30,
                        right: 30,
                        bottom: 30,
                      }}
                      src={data.avatar_url}
                      alt="profile picture"
                    />
                  </div>
                </div>
              </div>
            </section>

            <hr className="my-5 opacity-10" />
            <Projects repositories={repos} />
            <hr className="my-5 opacity-10" />
            <About data={data} />
            <hr className="my-5 opacity-10" />
            <Timeline />
          </main>
        </>
      )}
    </>
  );
};

export default Home;
