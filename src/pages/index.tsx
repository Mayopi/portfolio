import Image from "next/image";
import { FC } from "react";
import { Raleway } from "next/font/google";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import ScrollProgress from "@/components/ScrollProgress";

const raleway = Raleway({ subsets: ["latin"] });

const Home: FC = () => {
  return (
    <>
      <ScrollProgress />
      <main className={`${raleway.className} mx-5 lg:mx-16`}>
        <Navbar />
        <section className="mt-10 w-full">
          <h3 className="text-accent">Hello Everyone 👋 I'm</h3>
          <h1 className="text-4xl font-semibold tracking-wider">Mayopi</h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2">
            Software Engineer
          </motion.p>
          <p>Im a {new Date().getFullYear() - 2004} Years old</p>
        </section>
      </main>
    </>
  );
};

export default Home;
