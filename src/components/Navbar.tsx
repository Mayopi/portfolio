import React from "react";
import Link from "next/link";
import { FaGithub, FaBookReader } from "react-icons/fa";

type Props = {};

const Navbar: React.FC = (): React.ReactNode => {
  return (
    <div className="navbar">
      <div className="flex-1 text-primary">
        <Link href={"/"} className="btn btn-ghost normal-case text-xl tracking-wider">
          Mayopi
        </Link>
      </div>
      <div className="flex-none gap-3">
        <Link href={"/guestbook"}>
          <button className="btn btn-ghost hover:text-primary text-xl">
            <FaBookReader />
          </button>
        </Link>
        <Link href={"https://github.com/Mayopi"} target="__blank">
          <button className="btn btn-ghost hover:text-primary text-xl">
            <FaGithub />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
