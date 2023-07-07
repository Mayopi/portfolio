import React from "react";
import Link from "next/link";
import { FiLink } from "react-icons/fi";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import { InView } from "react-intersection-observer";
import { motion } from "framer-motion";
interface TimelineProps {}

interface TimelineItemProps {
  layout?: "right" | "left";
  title: string;
  content: string;
  date: string;
  learning?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ layout = "right", title, content, date, learning = false }): React.ReactNode => {
  return (
    <div className="timeline-item w-full flex">
      {layout === "right" ? (
        <>
          <InView triggerOnce>
            {({ inView, ref }) => (
              <motion.div ref={ref} initial={{ x: -100, opacity: 0 }} animate={inView ? { x: 0, opacity: 1 } : {}} transition={{ delay: 1 }} className="content w-1/2 max-h-[150px] pr-5">
                <h3 className="text-xl lg:text-2xl text-primary">{title}</h3>
                <p className="text-xs opacity-70 mt-2">{content}</p>
                <p className="text-xs text-opacity-70 mt-2 flex items-center gap-2">
                  <BsFillCalendarWeekFill className="inline" /> {date}
                </p>
              </motion.div>
            )}
          </InView>
          <InView triggerOnce>
            {({ inView, ref }) => (
              <div className="line flex flex-col items-center">
                <motion.div ref={ref} initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 0.25 }} className="dot w-3 h-3 rounded-full bg-secondary"></motion.div>
                <motion.div
                  ref={ref}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 }}
                  className={`${learning ? "border-dashed" : ""} border-l-2 origin-top border-white border-opacity-50 h-[150px]`}
                ></motion.div>
              </div>
            )}
          </InView>
        </>
      ) : (
        <>
          <div className="w-1/2"></div>
          <InView triggerOnce>
            {({ inView, ref }) => (
              <div className="line flex flex-col items-center pl-3">
                <motion.div ref={ref} initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 0.25 }} className="dot w-3 h-3 rounded-full bg-secondary"></motion.div>
                <motion.div
                  ref={ref}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 }}
                  className={`${learning ? "border-dashed" : ""} border-l-2 origin-top border-white border-opacity-50 h-[200px]`}
                ></motion.div>
              </div>
            )}
          </InView>
          <InView triggerOnce>
            {({ inView, ref }) => (
              <motion.div ref={ref} initial={{ x: 100, opacity: 0 }} animate={inView ? { x: 0, opacity: 1 } : {}} transition={{ delay: 1 }} className="content w-1/2 max-h-[200px] pl-5">
                <h3 className="text-xl lg:text-2xl text-primary">{title}</h3>
                <p className="text-xs opacity-70 mt-2">{content}</p>
                <p className="text-xs text-opacity-70 mt-2 flex items-center gap-2">
                  <BsFillCalendarWeekFill className="inline" /> {date}
                </p>
              </motion.div>
            )}
          </InView>
        </>
      )}
    </div>
  );
};

const Timeline: React.FC<TimelineProps> = (): React.ReactNode => {
  return (
    <section className="timeline mt-36 overflow-x-hidden">
      <h1 className="text-xl lg:text-2xl opacity-50 group flex gap-2 items-center">
        Time Line
        <Link href="#timeline">
          <FiLink className="font-extralight hidden group-hover:inline" />
        </Link>
      </h1>
      <h1 className="text-xl lg:text-3xl">How Did I Get Here?</h1>

      <div className="row w-full flex flex-col justify-center items-center mt-5">
        <TimelineItem
          layout="right"
          title="Basic Web Development"
          content="Learning foundation of web development consists of Hyper Text Markup Language, Cascading Style Sheet, and Javascript. Explored various concepts like HTML tags, CSS selectors, and basic JavaScript programming."
          date="2021"
        />
        <TimelineItem
          layout="left"
          title="General Backend"
          content="Continuously learning backend development using Node.js (JavaScript/TypeScript) and Python. Acquired knowledge in creating APIs, handling databases, and server-side scripting."
          date="2021 - 2023"
        />
        <TimelineItem
          layout="right"
          title="Fullstack Framework"
          content="Started exploring full-stack frameworks such as Next.js and Laravel, with a primary focus on Next.js. Developed dynamic web applications using server-side rendering, API integration, and front-end frameworks."
          date="2022 - now"
        />
        <TimelineItem layout="left" title="Machine Learning & Data Science" content="Currently learning Machine Learning and Data Science Engineering with Python, Numpy, Pandas and Matplotlib" date="now" learning />
      </div>
    </section>
  );
};

export default Timeline;
