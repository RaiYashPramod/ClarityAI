"use client";

import { TypographyLarge } from "./ui/Typography";

import ChatBox from "./ChatBox";

const ChatForm = () => {
  return (
    <>
      <div class="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="flex flex-col items-center mx-10 md:mx-32 h-screen text-white">
        <div className="lg:py-5">
          <TypographyLarge className="">
            Paste the <span className="text-indigo-500">URL</span> and ask any
            question related to that Page.
          </TypographyLarge>
        </div>

        <div className="w-full h-full">
          <ChatBox />
        </div>
      </div>
    </>
  );
};

export default ChatForm;
