import Image from "next/image";
import { FC } from "react";
import { Raleway } from "next/font/google";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import ScrollProgress from "@/components/ScrollProgress";
import AnimatedWord from "@/components/AnimatedWord";

const raleway = Raleway({ subsets: ["latin"] });

const Home: FC = () => {
  return (
    <>
      <ScrollProgress />
      <main className={`${raleway.className} mx-5 lg:mx-16`}>
        <Navbar />
        <section className="mt-10 w-full">
          <h3 className="text-accent lg:text-xl">Hello Everyone 👋 I'm</h3>
          <h1 className="text-4xl lg:text-6xl font-semibold tracking-wider">Mayopi</h1>
          <AnimatedWord text="Software Engineer" className="mt-5 lg:text-xl" />
          <p>Im a {new Date().getFullYear() - 2004} Years old</p>
        </section>
      </main>
    </>
  );
};

export default Home;
