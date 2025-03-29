
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          onClick={onClick} 
          size="icon"
          variant="default"
          className="h-14 w-14 rounded-full shadow-lg"
        >
          <MessageCircle size={24} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Edit with Chat</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ChatButton;
