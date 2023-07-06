import React from "react";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1 text-primary">
        <Link href={"/"} className="btn btn-ghost normal-case text-xl tracking-wider">
          Mayopi
        </Link>
      </div>
      <div className="flex-none gap-3">
        <Link href={"/home"}>
          <button className="btn btn-ghost hover:text-primary">Home</button>
        </Link>
        <Link href={"/about"}>
          <button className="btn btn-ghost hover:text-primary">About</button>
        </Link>
        <Link href={"/contact"}>
          <button className="btn btn-ghost hover:text-primary">Contact</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
