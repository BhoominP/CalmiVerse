import { useState, useRef, useEffect } from "react";
import { Sparkles, User, CornerDownLeft, CheckCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { addTask } from "@/utils/taskStorage"; // ✅ new import

// 🔗 Replace this with your backend API base URL
const API_BASE = "http://localhost:8000/api/chatbot";

async function aiGuidedFirstAid({ message }) {
  try {
    const res = await fetch(`${API_BASE}/firstaid`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!res.ok) throw new Error("Failed to fetch from backend");

    const data = await res.json();
    return data; // { response: string, suggestedTasks: [] }
  } catch (err) {
    console.error("❌ AI request error:", err);
    return {
      response: "⚠️ Sorry, something went wrong. Please try again.",
      suggestedTasks: [],
    };
  }
}

export default function FirstAidChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const aiResponse = await aiGuidedFirstAid({ message: input });

      const aiMessage = {
        sender: "ai",
        text: aiResponse.response,
        suggestedTasks: aiResponse.suggestedTasks,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Save task into localStorage so PointsTasks can pick it up
  const handleAddTask = (task) => {
  const newTask = {
    id: Date.now(),
    title: task.title,
    description: task.description || "",
    points: task.points,
    completed: false, // 👈 stays pending
  };

  addTask(newTask);
};

  return (
    <Card className="w-[520px] h-[680px] flex flex-col shadow-lg rounded-2xl overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-bold">
          <Sparkles className="text-purple-500" /> AI-Guided First Aid
        </CardTitle>
        <CardDescription className="text-gray-500 text-sm">
          Feeling overwhelmed? Share what's on your mind. I'm here to help.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 overflow-hidden">
        <ScrollArea className="h-full pr-2">
          <div ref={scrollRef} className="flex flex-col gap-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "ai" && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>
                      <Sparkles size={14} />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`max-w-[70%] px-3 py-2 rounded-lg text-sm ${
                    msg.sender === "user"
                      ? "bg-purple-500 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none"
                  }`}
                >
                  {msg.text}

                  {msg.sender === "ai" && msg.suggestedTasks?.length > 0 && (
                    <div className="mt-2 flex flex-col gap-1">
                      {msg.suggestedTasks.map((task, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          className="w-full flex items-center gap-2 text-xs"
                          onClick={() => handleAddTask(task)}
                        >
                          <CheckCircle size={14} /> {task.title} (+{task.points} pts)
                        </Button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === "user" && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>
                      <User size={14} />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-end gap-2 justify-start">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    <Sparkles size={14} />
                  </AvatarFallback>
                </Avatar>
                <div className="flex gap-1 bg-gray-100 rounded-lg px-3 py-2">
                  <Skeleton className="w-2 h-2 rounded-full animate-pulse" />
                  <Skeleton className="w-2 h-2 rounded-full animate-pulse delay-150" />
                  <Skeleton className="w-2 h-2 rounded-full animate-pulse delay-300" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="border-t p-3 bg-white">
        <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="For example: 'I feel anxious about my exams...'"
            disabled={isLoading}
            className="flex-1 resize-none min-h-[40px]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            Send <CornerDownLeft size={16} className="ml-1" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
