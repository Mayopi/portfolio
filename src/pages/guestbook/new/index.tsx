import { FC, ReactNode, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import { MdArticle, MdOutlineFormatListBulleted } from "react-icons/md";
import { BiHeading, BiBold, BiItalic } from "react-icons/bi";
import { GoQuote } from "react-icons/go";
import { BsCode, BsListOl, BsListTask } from "react-icons/bs";
import { FiLink } from "react-icons/fi";
import Markdown from "markdown-to-jsx";
import CodeBlock from "@/components/CodeBlock";

const Heading1: FC<{ children: ReactNode }> = ({ children }): ReactNode => {
  return (
    <>
      <h1 className="font-semibold text-xl text-primary">{children}</h1>
      <hr className="border-t " />
    </>
  );
};

const NewGuestBook: FC = (): ReactNode => {
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);

  const markdownSyntax = (startTag: string, endTag: string) => {
    const textarea = document.getElementById("guestbook") as HTMLTextAreaElement;

    const { selectionStart, selectionEnd } = textarea;
    const selectedText: string = textarea.value.substring(selectionStart, selectionEnd);
    const newText: string = `${startTag}${selectedText}${endTag}`;

    const updatedContent = textarea.value.substring(0, selectionStart) + newText + textarea.value.substring(selectionEnd);

    setContent(updatedContent);

    const newCursorStartPosition: number = selectionStart + startTag.length;
    const newCursorEndPosition: number = selectionStart + startTag.length + selectedText.length;
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorStartPosition, newCursorEndPosition);
    }, 0);
  };

  return (
    <>
      <Head>
        <title>Portfolio - New Guestbook</title>
      </Head>
      <main className="mx-5 pb-24 lg:mx-16">
        <Navbar />

        <section className="w-full">
          <h1 className="font-semibold text-lg lg:text-2xl uppercase flex justify-center items-center gap-2 tracking-wide text-center">
            <MdArticle className="inline" /> Create new Guestbook
          </h1>
          <form className="w-full mt-10">
            <div className="w-full bg-base-200 min-h-[60px] rounded-t flex justify-between">
              <div className="h-[60px] flex items-end w-1/2 px-5">
                <div className="tabs">
                  <a className={`tab tab-bordered ${!preview ? "tab-active" : ""}`} onClick={() => setPreview(false)}>
                    Write
                  </a>
                  <a className={`tab tab-bordered ${preview ? "tab-active" : ""}`} onClick={() => setPreview(true)}>
                    Preview
                  </a>
                </div>
              </div>

              <div className="editors w-1/2 flex gap-5 justify-end px-10">
                <div className="typography flex gap-2 items-center justify-center">
                  <button type="button" className="text-xl hover:text-primary tooltip tooltip-info" data-tip="Heading" onClick={() => markdownSyntax("# ", "")}>
                    <BiHeading />
                  </button>
                  <button type="button" className="text-xl hover:text-primary tooltip tooltip-info" data-tip="Bold" onClick={() => markdownSyntax("**", "**")}>
                    <BiBold />
                  </button>
                  <button type="button" className="text-xl hover:text-primary tooltip tooltip-info" data-tip="Italic" onClick={() => markdownSyntax("_", "_")}>
                    <BiItalic />
                  </button>
                </div>

                <div className="blocks flex gap-2 items-center justify-center">
                  <button type="button" className="text-xl hover:text-primary tooltip tooltip-info" data-tip="Quote Block" onClick={() => markdownSyntax("> ", "")}>
                    <GoQuote />
                  </button>
                  <button type="button" className="text-xl hover:text-primary tooltip tooltip-info" data-tip="Code Block" onClick={() => markdownSyntax("`", "`")}>
                    <BsCode />
                  </button>
                  <button type="button" className="text-xl hover:text-primary tooltip tooltip-info" data-tip="Hyperlink" onClick={() => markdownSyntax("[", "](url)")}>
                    <FiLink />
                  </button>
                </div>

                <div className="lists flex gap-2 items-center justify-center">
                  <button type="button" className="text-xl hover:text-primary tooltip tooltip-info" data-tip="Bullet List" onClick={() => markdownSyntax("- ", "")}>
                    <MdOutlineFormatListBulleted />
                  </button>
                  <button type="button" className="text-xl hover:text-primary tooltip tooltip-info" data-tip="Number List" onClick={() => markdownSyntax("1. ", "")}>
                    <BsListOl />
                  </button>
                  <button type="button" className="text-xl hover:text-primary tooltip tooltip-info" data-tip="Task List" onClick={() => markdownSyntax("- [ ] ", "")}>
                    <BsListTask />
                  </button>
                </div>
              </div>
            </div>
            {preview ? (
              <article className="min-w-full prose lg:prose-xl p-5">
                <Markdown
                  options={{
                    wrapper: "article",
                    overrides: {
                      h1: {
                        component: Heading1,
                      },
                      code: {
                        component: CodeBlock,
                      },
                    },
                  }}
                >
                  {content}
                </Markdown>
              </article>
            ) : (
              <textarea
                name="content"
                id="guestbook"
                rows={30}
                className="bg-transparent rounded-b w-full h-[400px] border border-slate-700 p-3"
                placeholder="Type Here"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            )}
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default NewGuestBook;
