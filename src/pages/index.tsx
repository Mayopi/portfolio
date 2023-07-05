import Image from "next/image";
import { FC } from "react";
import { Raleway } from "next/font/google";
import Navbar from "@/components/Navbar";

const raleway = Raleway({ subsets: ["latin"] });

const Home: FC = () => {
  return (
    <main className={`${raleway.className}`}>
      <Navbar />
      <div className="container">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime tempore culpa itaque asperiores repellendus saepe, dignissimos qui voluptatibus voluptas nihil deserunt cum obcaecati sit ducimus cupiditate ex nostrum quis repellat.
      </div>
    </main>
  );
};

export default Home;
