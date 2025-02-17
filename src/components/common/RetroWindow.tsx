// src/components/common/RetroWindow.tsx
import React from 'react';
import { PixelatedWindowControls } from './PixelatedIcons';

interface RetroWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const RetroWindow: React.FC<RetroWindowProps> = ({ 
  title, 
  children, 
  className = '' 
}) => {
  return (
    <div className={`
      bg-gray-800 
      border-2 border-gray-600 
      shadow-[4px_4px_0px_0px_rgba(147,197,253,0.3)]
      ${className}
    `}>
      <div className="bg-gray-700 px-2 py-1 border-b-2 border-gray-600 flex justify-between items-center">
        <span className="text-white font-fsex300">{title}</span>
        <PixelatedWindowControls />
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default RetroWindow;