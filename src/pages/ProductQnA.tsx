import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

function ProductQnA() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there! I need more info about your thing", sender: "bot" },
    { id: 2, text: "Hi! How can I help you?", sender: "user" }
  ])
  const [input, setInput] = useState("")

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages([...messages, { id: Date.now(), text: input, sender: "user" }])
    setInput("")
  }

  return (
    <div className="flex flex-col h-screen max-h-screen">
        <Progress value={33} />
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t p-3 flex items-center gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-md px-3 py-2 outline-none"
        />
        <Button
          onClick={sendMessage}
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground"
        >
          Send
        </Button>
      </div>
    </div>
  )
}

export default ProductQnA
