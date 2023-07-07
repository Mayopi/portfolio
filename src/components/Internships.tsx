import React from "react";
import Link from "next/link";
import { FiLink } from "react-icons/fi";
import Image from "next/image";

const Internships: React.FC = (): React.ReactNode => {
  return (
    <section className="internships mt-36" id="internships">
      <h1 className="text-xl lg:text-2xl opacity-50 group flex gap-2 items-center">
        Internship
        <Link href="#about">
          <FiLink className="font-extralight hidden group-hover:inline" />
        </Link>
      </h1>
      <div className="w-full flex flex-wrap">
        <div className="w-full lg:w-1/2 lg:pr-2">
          <h1 className="text-xl lg:text-3xl mt-5">Who Have I Worked With?</h1>
          <p className="opacity-50 mt-2">As part of the intern team, I had the opportunity to work on a very challenging and fun project. This gave me valuable experience and increased my knowledge about the latest technologies.</p>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-evenly gap-2 lg:mt-0 mt-5">
          <div className="item-logo grayscale cursor-pointer hover:grayscale-0 transition tooltip tooltip-info" data-tip="PT. Cazh Teknologi Inovasi">
            <Link href={"https://cazh.id/"} target="_blank">
              <Image src="/images/cazh-logo.png" width={200} height={50} alt="cazh logo" className="max-w-[100%] object-scale-up" />
            </Link>
          </div>
          <div className="item-logo grayscale cursor-pointer hover:grayscale-0 transition tooltip tooltip-info" data-tip="Affandra Solusi Teknologi">
            <Image src="/images/sarpras-logo.png" width={80} height={80} alt="sarpras logo" className="max-w-[100%] object-scale-up" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Internships;
