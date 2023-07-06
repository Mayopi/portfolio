import React, { FC, ReactNode } from "react";
import { motion, useSpring, useScroll } from "framer-motion";

interface ScrollProgressProps {
  className?: string;
};

const ScrollProgress: FC<ScrollProgressProps> = ({className}): ReactNode => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress);
  return <motion.div className={`${className} bg-primary fixed h-[10px] top-0 left-0 right-0 origin-top-left opacity-70 z-50`} style={{ scaleX }} />;
};

export default ScrollProgress;
