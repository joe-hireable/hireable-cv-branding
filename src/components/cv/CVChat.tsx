
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface CVChatProps {
  onClose: () => void;
  onUpdate?: (field: string, value: any) => void;
}

const CVChat: React.FC<CVChatProps> = ({ onClose, onUpdate }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I can help you edit this CV. What would you like to change?',
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const { toast } = useToast();
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate processing the message
    setTimeout(() => {
      // In a real implementation, this would parse the user's intent and make the appropriate changes
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        text: `I've updated the CV based on your request: "${inputValue}"`,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Notify the user
      toast({
        title: "CV Updated",
        description: "The CV has been updated successfully.",
      });
      
      // If we had a real parser and understood what field to update:
      // onUpdate && onUpdate('some.field.path', 'new value');
    }, 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <Card className="flex flex-col h-[500px] max-w-md">
      <div className="flex items-center justify-between p-3 border-b">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <ArrowLeft size={18} />
        </Button>
        <h2 className="text-lg font-semibold">Edit with Chat</h2>
        <div className="w-8" /> {/* Spacer for visual balance */}
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`flex items-start max-w-[80%] ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-l-lg rounded-br-lg ml-12' 
                    : 'bg-muted rounded-r-lg rounded-bl-lg mr-12'
                } p-3`}
              >
                {message.sender === 'assistant' && (
                  <Avatar className="h-8 w-8 mr-2">
                    <img src="/lovable-uploads/b54e75aa-1ac4-480a-ac45-0e76da50c9bb.png" alt="Assistant" />
                  </Avatar>
                )}
                <div>
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t">
        <div className="flex gap-2">
          <Input 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your edit instructions..."
            className="flex-1"
          />
          <Button size="icon" onClick={handleSendMessage} disabled={!inputValue.trim()}>
            <Send size={18} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CVChat;
