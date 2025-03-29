
import React from 'react';
import { Link } from 'react-router-dom';

interface HireableLogoProps {
  variant?: 'icon' | 'full';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const HireableLogo: React.FC<HireableLogoProps> = ({ 
  variant = 'full',
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: variant === 'icon' ? 'w-6 h-6' : 'h-6',
    md: variant === 'icon' ? 'w-8 h-8' : 'h-8',
    lg: variant === 'icon' ? 'w-12 h-12' : 'h-12',
  };

  return (
    <Link to="/dashboard" className={`flex items-center ${className}`}>
      {variant === 'icon' ? (
        <img 
          src="/lovable-uploads/b54e75aa-1ac4-480a-ac45-0e76da50c9bb.png" 
          alt="Hireable Logo" 
          className={`${sizeClasses[size]}`}
        />
      ) : (
        <img 
          src="/lovable-uploads/972de336-724b-4e0e-b875-f451045c7dbc.png" 
          alt="Hireable Logo" 
          className={`${sizeClasses[size]}`}
        />
      )}
    </Link>
  );
};

export default HireableLogo;
