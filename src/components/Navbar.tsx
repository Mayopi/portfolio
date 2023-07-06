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
        <Link href={"#about"}>
          <button className="btn btn-ghost hover:text-primary">Learn More</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
