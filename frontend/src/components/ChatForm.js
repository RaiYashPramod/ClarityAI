"use client";

import { TypographyLarge } from "./ui/Typography";

import ChatBox from "./ChatBox";

const ChatForm = () => {
  return (
    <>
      <div className="flex flex-col items-center mx-10 md:mx-32 h-screen">
        <div className="lg:py-5">
          <TypographyLarge className="">
            Paste the <span className="text-red-400">URL</span> and ask any
            question related to that Page.
          </TypographyLarge>
        </div>

        <div className="h-full w-full">
          <ChatBox />
        </div>
      </div>
    </>
  );
};

export default ChatForm;
