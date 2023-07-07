import React from "react";
import { MdLocationOn } from "react-icons/md";
import { FiLink } from "react-icons/fi";
import { BsCode } from "react-icons/bs";
import { SiMysql, SiTailwindcss, SiJavascript, SiHtml5, SiMongodb, SiTypescript, SiExpress } from "react-icons/si";
import { FaTrophy, FaReact, FaNodeJs, FaPython, FaGitAlt, FaGithub, FaLaravel } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { InView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Link from "next/link";

interface AboutProps {
  data: {
    name: string;
    location: string;
  };
}

const About: React.FC<AboutProps> = ({ data }): React.ReactNode => {
  return (
    <section className="about mt-36" id="about">
      <h1 className="text-xl lg:text-2xl opacity-50 group flex gap-2 items-center">
        About Me
        <Link href="#about">
          <FiLink className="font-extralight hidden group-hover:inline" />
        </Link>
      </h1>

      <div className="row flex flex-wrap w-full">
        <div className="w-full lg:w-1/2 lg:pr-2">
          <h1 className="text-xl lg:text-3xl mt-5">Curious About Me?</h1>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} className="opacity-50">
            Combining my expertise and passion for technology development, I help companies and communities solve problems and build high-quality applications. I&apos;m ready to be a part of your future solution.
          </motion.p>
        </div>

        <div className="w-full lg:w-1/2 cards mt-5 flex flex-wrap justify-center items-center gap-3">
          <div className="card w-full lg:w-52 h-36 rounded bg-base-200 shadow-xl">
            <div className="card-body p-3 flex items-center flex-col">
              <h3 className="">
                <BsCode className="text-primary text-xl" />
              </h3>
              <h1>Experience</h1>
              <p className="text-xs text-center">
                Approximately <span className="text-secondary text-xs">2</span> Years worth of experience
              </p>
            </div>
          </div>

          <div className="card w-full lg:w-52 h-36 rounded bg-base-200 shadow-xl">
            <div className="card-body p-3 flex items-center flex-col">
              <h3 className="">
                <FaTrophy className="text-primary text-xl" />
              </h3>
              <h1>Achievement</h1>
              <p className="text-xs text-center">
                <Link href="/certificate" className="link">
                  See Certificates
                </Link>
              </p>
            </div>
          </div>

          <div className="card w-full lg:w-52 h-36 rounded bg-base-200 shadow-xl">
            <div className="card-body p-3 flex items-center flex-col">
              <h3 className="">
                <MdLocationOn className="text-primary text-xl" />
              </h3>
              <h1>Location</h1>
              <Link href={`https://google.com/maps/place/${data.location}`} target={"__blank"}>
                <p className="text-xs link link-secondary text-center">
                  <span className="text-secondary text-xs">{data.location}</span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-10 w-full">
        <h1 className="text-xl lg:text-2xl opacity-50">What Can I Do?</h1>
        <h1 className="text-xl lg:text-3xl mt-5">My Skill are Consist of</h1>

        <div className="w-full flex gap-2 justify-between">
          <InView triggerOnce>
            {({ inView, ref }) => (
              <motion.div ref={ref} initial={{ y: 100, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ delay: 0.5 }} className="w-full lg:w-1/2 mt-2 group">
                <div className="card rounded h-[120px]  border border-white border-opacity-50 p-2">
                  <h3 className="text-primary lg:text-xl text-center">Front End Stack</h3>
                  <div className="card-body gap-2 flex-row w-full text-xs lg:text-xl flex flex-wrap p-0 lg:p-5">
                    <p className="group-hover:text-cyan-500 transition">
                      <FaReact className="inline" /> React
                    </p>
                    <p className="group-hover:text-teal-500 transition">
                      <SiTailwindcss className="inline" /> Tailwindcss
                    </p>
                    <p className="group-hover:text-yellow-500 transition">
                      <SiJavascript className="inline" /> Javascript
                    </p>
                    <p className="group-hover:text-orange-500 transition">
                      <SiHtml5 className="inline" /> HTML
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </InView>
          <InView triggerOnce>
            {({ inView, ref }) => (
              <motion.div ref={ref} initial={{ y: 100, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ delay: 0.75 }} className="w-full lg:w-1/2 mt-2 group">
                <div className="card rounded h-[120px]  border border-white border-opacity-50 p-2">
                  <h3 className="text-primary lg:text-xl text-center">Back End Stack</h3>
                  <div className="card-body gap-2 flex-row w-full text-xs lg:text-xl flex flex-wrap p-0 lg:p-5">
                    <p>
                      <FaPython className="inline" /> <span className="group-hover:bg-gradient-to-r group-hover:text-transparent group-hover:bg-clip-text group-hover:from-blue-500 group-hover:to-yellow-500 transition">Python</span>
                    </p>
                    <p className="group-hover:text-green-700 transition">
                      <FaNodeJs className="inline" /> NodeJS
                    </p>
                    <p className="group-hover:text-blue-500 transition">
                      <SiTypescript className="inline" /> Typescript
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </InView>
        </div>
        <div className="w-full flex gap-2 justify-between">
          <InView triggerOnce>
            {({ inView, ref }) => (
              <motion.div ref={ref} initial={{ y: 100, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ delay: 0.5 }} className="w-full lg:w-1/2 mt-2 group">
                <div className="card rounded h-[120px]  border border-white border-opacity-50 p-2">
                  <h3 className="text-primary lg:text-xl text-center">Tools & Framework</h3>
                  <div className="card-body gap-2 flex-row w-full text-xs lg:text-xl flex flex-wrap p-0 lg:p-5">
                    <p className="group-hover:text-red-500 transition">
                      <FaGitAlt className="inline" /> Git
                    </p>
                    <p className="group-hover:text-gray-500 transition">
                      <FaGithub className="inline" /> Github
                    </p>
                    <p className="group-hover:text-gray-500 transition">
                      <TbBrandNextjs className="inline" /> Next JS
                    </p>
                    <p className="group-hover:text-red-500 transition">
                      <FaLaravel className="inline" /> Laravel
                    </p>
                    <p className="group-hover:text-yellow-500 transition">
                      <SiExpress className="inline" /> Express
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </InView>
          <InView triggerOnce>
            {({ inView, ref }) => (
              <motion.div ref={ref} initial={{ y: 100, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ delay: 0.75 }} className="w-full lg:w-1/2 mt-2 group">
                <div className="card rounded h-[120px]  border border-white border-opacity-50 p-2">
                  <h3 className="text-primary lg:text-xl text-center">Databases</h3>
                  <div className="card-body gap-2 flex-row w-full text-xs lg:text-xl flex flex-wrap p-0 lg:p-5">
                    <p className="group-hover:text-blue-500 transition">
                      <SiMysql className="inline" /> MySQL
                    </p>
                    <p className="group-hover:text-green-500 transition">
                      <SiMongodb className="inline" /> MongoDB
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </InView>
        </div>
      </div>
    </section>
  );
};

export default About;
