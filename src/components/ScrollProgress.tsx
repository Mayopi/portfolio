import React from "react";
import { motion, useSpring, useScroll } from "framer-motion";

type Props = {
  className?: string;
};

const ScrollProgress = (props: Props) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return <motion.div className={`${props.className} bg-primary fixed h-[10px] top-0 left-0 right-0 origin-top-left opacity-50`} style={{ scaleX }} />;
};

export default ScrollProgress;
