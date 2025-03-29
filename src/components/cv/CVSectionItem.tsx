
import React from 'react';
import { GripVertical } from 'lucide-react';

interface CVSectionItemProps {
  title: string;
  isDragging?: boolean;
  dragHandleProps?: any;
}

const CVSectionItem: React.FC<CVSectionItemProps> = ({ 
  title, 
  isDragging = false,
  dragHandleProps = {}
}) => {
  return (
    <div 
      className={`border rounded p-2 flex items-center justify-between bg-background cursor-move transition-colors ${
        isDragging ? 'border-primary bg-primary/10' : ''
      }`}
    >
      <span className="font-medium">{title}</span>
      <div className="flex items-center gap-1" {...dragHandleProps}>
        <GripVertical size={16} className="text-muted-foreground" />
      </div>
    </div>
  );
};

export default CVSectionItem;
