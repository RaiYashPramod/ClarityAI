import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { quantum } from 'ldrs'
import { cn } from "@/lib/utils";
import { DotPattern } from "./ui/dot-pattern"


if (typeof window !== 'undefined') {
  quantum.register();
}

const ChatBox = () => {
  const [URL, setURL] = useState("");
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!URL || !query) {
      toast("Please enter a URL and a query to ask.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3030/conversation", {
        url: URL,
        query: query,
      });
      const ai = response.data.response;
      setChatHistory((prevHistory) => [...prevHistory, { query, ai }]);
      setLoading(false);
      setQuery("");
    } catch (error) {
      console.log(error);
      toast("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <div className="flex flex-col h-full gap-10">
        <Input
          type="text"
          placeholder="Paste the URL Here..."
          value={URL}
          onChange={(e) => setURL(e.target.value)}
          className="shadow-lg border-2 border-neutral-900 bg-neutral-700 rounded-md focus:outline-none placeholder:text-white"
        />

        <ScrollArea
          className="h-3/4 bg-neutral-950 rounded-lg p-4 text-white text-lg border-2 overflow-hidden shadow-lg border-zinc-300 font-mono"
          type="text"
        >
          {chatHistory.length > 0 ? (
            chatHistory.map((item, index) => (
              <div key={index} className="flex flex-col gap-4 pb-4">
                <div className="flex flex-row">
                  <p className="font-bold p-2">User:</p>
                  <p className="bg-neutral-700 p-2 rounded-xl">{item.query}</p>
                </div>
                <div className="flex flex-row">
                  <p className="font-bold p-2">AI:</p>
                  <p className="bg-neutral-700 p-2 rounded-xl max-w-5xl">{item.ai}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="flex justify-center items-center">Start by pasting the URL...</p>
          )}
          <DotPattern
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            className={cn(
              "[mask-image:radial-gradient(30rem_at_center,white,transparent)]",
            )}
          />
        </ScrollArea>

        <div className="flex gap-6">
          <Input
            type="text"
            placeholder="Ask a question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="shadow-lg border-2 border-neutral-900 bg-neutral-700 text-white placeholder:text-white"
          />
          {loading ? (
            <Button className="w-1/6 shadow-lg">
              <l-quantum size="35" speed="1.75" color="white"></l-quantum>
            </Button>
          ) : (
            <Button className="w-1/6 shadow-lg bg-indigo-500" onClick={handleAsk}>
              Ask
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatBox;
