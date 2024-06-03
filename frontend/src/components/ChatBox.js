import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { quantum } from 'ldrs'


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
      const response = await axios.post("http://localhost:3000/conversation", {
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
      <div className="w-full flex flex-col h-full gap-4">
        <Input
          type="text"
          placeholder="Paste the URL Here..."
          value={URL}
          onChange={(e) => setURL(e.target.value)}
        />

        <ScrollArea
          className="h-3/4 bg-slate-300 rounded-lg p-4 text-black border overflow-auto"
          type="text"
        >
          {chatHistory.length > 0 ? (
            chatHistory.map((item, index) => (
              <div key={index} className="mb-2">
                <p className="font-bold">User:</p>
                <p>{item.query}</p>
                <p className="font-bold">AI:</p>
                <p>{item.ai}</p>
              </div>
            ))
          ) : (
            <p className="flex justify-center items-center">Start by pasting the URL...</p>
          )}
        </ScrollArea>

        <div className="flex gap-2 pb-10">
          <Input
            type="text"
            placeholder="Ask a question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {loading ? (
            <Button className="w-1/6">
              <l-quantum size="35" speed="1.75" color="white"></l-quantum>
            </Button>
          ) : (
            <Button className="w-1/6" onClick={handleAsk}>
              Ask
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatBox;
