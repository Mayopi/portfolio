import Image from "next/image";
import { FC } from "react";
import { Raleway } from "next/font/google";
const raleway = Raleway({ subsets: ["latin"] });

const Home: FC = () => {
  return <main className={raleway.className}></main>;
};

export default Home;
