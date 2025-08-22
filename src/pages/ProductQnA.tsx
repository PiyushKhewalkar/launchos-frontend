import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useParams, useNavigate } from "react-router-dom"
import { getProduct, sendMessage, skipChat } from "@/utils/api.js"

import {motion, AnimatePresence} from "motion/react"

function ProductQnA() {
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const [product, setProduct] = useState<any>(null)

  const navigate = useNavigate()
  
  // Ref for the chat container to enable scrolling
  const chatContainerRef = useRef<HTMLDivElement>(null)
  
  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  const sendUserMessage = async () => {
    if (!input.trim() || !productId) return
    
    const userMessage = { _id: Date.now(), message: input, sender: "user" }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    
    try {
      const response = await sendMessage(productId, input)
      if (response && response.assistantReply) {
        const botMessage = { 
          _id: Date.now() + 1, 
          message: response.assistantReply, 
          sender: "assistant" 
        }
        setMessages(prev => [...prev, botMessage])
        
        // Update progress based on milestone completion
        if (response.milestonesCompleted) {
          const [completed, total] = response.milestonesCompleted.split('/').map(Number)
          const progressPercentage = Math.round((completed / total) * 100)
          setProgress(progressPercentage)
        }
      }
    } catch (error) {
      console.error("Error sending message:", error)
      // Add error message to chat
      const errorMessage = { 
        _id: Date.now() + 1, 
        message: "Sorry, I couldn't process your message. Please try again.", 
        sender: "assistant" 
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSkip = async () => {
    if (!productId) return
    
    setIsLoading(true)
    try {
      const response = await skipChat(productId)
      
      // Handle successful skip
      if (response && response.message === "Chat skipped successfully") {
        // Add success message to chat
        const successMessage = { 
          _id: Date.now() + 1, 
          message: "Chat skipped successfully! Your product is now ready for campaigns.", 
          sender: "assistant" 
        }
        setMessages(prev => [...prev, successMessage])

        navigate(`/campaign/${productId}`)
        
        // Set progress to 100% since the product is completed
        setProgress(100)
        
        // Update product state if needed
        if (response.product) {
          console.log("Product updated:", response.product)
        }
      }
    } catch (error: any) {
      console.error("Error skipping chat:", error)
      
      // Handle specific error cases
      let errorMessage = "Sorry, I couldn't skip the chat. Please try again."
      
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = "Product not found."
        } else if (error.response.status === 400) {
          errorMessage = "Product is already completed."
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message
        }
      }
      
      // Add error message to chat
      const errorMsg = { 
        _id: Date.now() + 1, 
        message: errorMessage, 
        sender: "assistant" 
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }

  const { productId } = useParams()

  useEffect(() => {
    const fetchProduct = async() => {
      if (!productId) return
      
      try {
        const response = await getProduct(productId)
        if (response && response.product) {
          setProduct(response.product)
        }
      } catch (error) {
        console.error("Error fetching product:", error)
      }
    }

    fetchProduct()
  }, [productId])

  useEffect(() => {
    if (product && product.chat) {
      // Set all messages from the product's chat array
      setMessages(product.chat)
    }
  }, [product])
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])


  return (
    <div className="flex flex-col h-screen max-h-screen">
        <div className="w-full h-12 bg-muted/30 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-primary/20 transition-all duration-500 ease-out backdrop-blur-sm" 
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5"></div>
          </div>
          <div className="relative z-10 flex items-center justify-between h-full mx-5">
            <span className="text-sm font-medium text-foreground max-w-[70%] text-wrap">
              {product?.rawData?.name || "Product"}
            </span>
            <Button 
              variant={"ghost"} 
              className="font-normal text-muted-foreground"
              onClick={handleSkip}
              disabled={isLoading}
            >
              Skip
            </Button>
          </div>
        </div>
      {/* Chat messages */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg._id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {msg.message}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Typing indicator */}
        {isLoading && (
          <motion.div 
            className="flex justify-start"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="max-w-xs md:max-w-md px-4 py-2 rounded-lg bg-muted text-muted-foreground">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}
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
          onClick={sendUserMessage}
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground"
          disabled={!input.trim()}
        >
          Send
        </Button>
      </div>
    </div>
  )
}

export default ProductQnA
