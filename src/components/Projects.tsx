import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiLink } from "react-icons/fi";
import { BsCode } from "react-icons/bs";
import { SiTypescript, SiJavascript, SiHtml5 } from "react-icons/si";
import { FaCopy, FaGithub, FaPython, FaDocker, FaCss3Alt } from "react-icons/fa";
import { InView } from "react-intersection-observer";
import { motion } from "framer-motion";
import useSWR from "swr";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface GithubRepository {
  clone_url: string;
  created_at: string;
  description: string;
  name: string;
  homepage: string;
  html_url: string;
  languages_url: string;
}

interface ProjectListProps {
  repositories: GithubRepository[];
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const LanguageLogo: React.FC<{ language: string }> = ({ language }): React.ReactNode => {
  switch (language) {
    case "TypeScript":
      return <SiTypescript className="text-lg transition hover:text-blue-500" />;
    case "JavaScript":
      return <SiJavascript className="text-lg transition hover:text-yellow-500" />;
    case "HTML":
      return <SiHtml5 className="text-lg transition hover:text-orange-500" />;
    case "Python":
      return <FaPython className="text-lg transition hover:text-blue-700" />;
    case "Dockerfile":
      return <FaDocker className="text-lg transition hover:text-blue-500" />;
    case "CSS":
      return <FaCss3Alt className="text-lg transition hover:text-blue-400" />;
    default:
      return null;
  }
};

const RepositoryCard: React.FC<{ repo: GithubRepository; index: number }> = ({ repo, index }) => {
  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }, [isCopied]);

  const { data: repoLanguages, error: repoLanguages_error, isLoading: repoLanguages_loading } = useSWR<{ [key: string]: number }>(repo.languages_url, fetcher);

  const languageEntries = repoLanguages ? Object.entries(repoLanguages) : [];

  return (
    <InView triggerOnce>
      {({ inView, ref }) => (
        <motion.div ref={ref} initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}} transition={{ delay: 0.25 * index }} className="card w-full px-3 lg:w-1/2 mt-10">
          <div className="card-body relative bg-base-200 p-5 rounded-lg">
            <div className="relative">
              <p className="absolute top-1 left-1 opacity-50">Clone Github Repository</p>
            </div>
            <CopyToClipboard text={repo.clone_url}>
              <button className="absolute top-2 right-2 btn btn-outline btn-primary aspect-square flex items-center justify-center" onClick={() => setIsCopied(true)} disabled={isCopied}>
                {isCopied ? "Copied!" : <FaCopy />}
              </button>
            </CopyToClipboard>
            <h1 className="text-lg lg:text-2xl mt-5 text-primary">{repo.name}</h1>
            <p>{repo.description || "No Description Provided"}</p>

            <div className="languages flex gap-2">
              {languageEntries.map(([language]) => (
                <div key={language}>
                  <LanguageLogo language={language} />
                </div>
              ))}
            </div>
            <Link href={repo.html_url} target="_blank" className="hover:link link-secondary">
              Source Code <BsCode className="inline" />
            </Link>
          </div>
          <div className="card-footer mt-5">
            {repo.homepage ? (
              <Link href={repo.homepage} target="_blank">
                <button className="link rounded">See Demo &raquo;</button>
              </Link>
            ) : (
              <div>No Demo Available</div>
            )}
          </div>
        </motion.div>
      )}
    </InView>
  );
};

const Projects: React.FC<ProjectListProps> = ({ repositories }) => {
  return (
    <section className="projects mt-36">
      <h1 className="text-xl lg:text-2xl opacity-50 group flex gap-2 items-center">
        Latest Projects
        <Link href="#timeline">
          <FiLink className="font-extralight hidden group-hover:inline" />
        </Link>
      </h1>
      <h1 className="text-xl lg:text-3xl mt-5">What Did I Make?</h1>

      <div className="cards flex flex-wrap mt-5 justify-center items-center">
        {repositories.map((repo, index) => (
          <RepositoryCard key={repo.name} repo={repo} index={index} />
        ))}
      </div>

      <h1 className="text-xl lg:text-2xl mt-10 text-center opacity-50">Want to Explore More Projects?</h1>
      <Link href={"https://github.com/Mayopi"} className="text-center flex w-full items-center justify-center" target="__blank">
        <button className="mt-5 btn font-base btn-primary">
          Explore My Github <FaGithub className="inline text-xl" />
        </button>
      </Link>
    </section>
  );
};

export default Projects;
