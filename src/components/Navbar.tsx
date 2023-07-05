import React from "react";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1 text-primary">
        <Link href={"/"} className="btn btn-ghost normal-case text-xl">
          Mayopi
        </Link>
      </div>
      <div className="flex-none gap-3">
        <button className="btn btn-square btn-ghost">test</button>
      </div>
    </div>
  );
};

export default Navbar;
