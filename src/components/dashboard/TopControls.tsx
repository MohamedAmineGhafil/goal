// src/components/dashboard/TopControls.tsx
import React from 'react';
import { Calendar, Download, Upload, Settings } from 'lucide-react';

interface TopControlsProps {
  onViewChange: (view: 'dashboard' | 'calendar') => void;
  currentView: 'dashboard' | 'calendar';
  onExport: () => void;
  onImport: (file: File) => void;
  onOpenSettings: () => void;
  averageRank: { name: string; color: string; shadowColor: string };
  totalXP: number;
}

const TopControls: React.FC<TopControlsProps> = ({
  onViewChange,
  currentView,
  onExport,
  onImport,
  onOpenSettings,
  averageRank,
  totalXP
}) => {
  return (
    <div className="mb-6">
      <div className="bg-gray-800 border-2 border-gray-600 p-4"
           style={{ boxShadow: `4px 4px 0px 0px rgba(147, 197, 253, 0.3)` }}>
        
        {/* Top Row - Rank and Controls */}
        <div className="flex justify-between items-center mb-4">
          {/* Rank Display */}
          <div className="flex items-center gap-4">
            <span className="font-fsex300 text-lg" style={{ color: averageRank.color }}>
              {averageRank.name}
            </span>
            <span className="text-gray-400 font-fsex300">
              Total XP: {totalXP}
            </span>
          </div>
          
          {/* Controls */}
          <div className="flex gap-4">
            {/* View Toggle */}
            <button
              onClick={() => onViewChange(currentView === 'dashboard' ? 'calendar' : 'dashboard')}
              className={`
                p-2 border-2 font-fsex300 flex items-center gap-2
                ${currentView === 'calendar' ? 'bg-gray-700 border-gray-500' : 'bg-gray-800 border-gray-600'}
                hover:bg-gray-700 transition-colors
              `}
            >
              <Calendar size={16} />
              {currentView === 'dashboard' ? 'View Calendar' : 'View Dashboard'}
            </button>

            {/* Export Button */}
            <button
              onClick={onExport}
              className="p-2 bg-gray-800 border-2 border-gray-600 hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <Download size={16} />
              Export
            </button>

            {/* Import Button */}
            <label className="p-2 bg-gray-800 border-2 border-gray-600 hover:bg-gray-700 transition-colors flex items-center gap-2 cursor-pointer">
              <Upload size={16} />
              Import
              <input
                type="file"
                accept=".json"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onImport(file);
                }}
                className="hidden"
              />
            </label>

            {/* Settings Button */}
            <button
              onClick={onOpenSettings}
              className="p-2 bg-gray-800 border-2 border-gray-600 hover:bg-gray-700 transition-colors"
            >
              <Settings size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopControls;