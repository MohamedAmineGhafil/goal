// src/components/dashboard/ProgressControls.tsx
import React, { useRef } from 'react';

interface ProgressControlsProps {
  onImport: (file: File) => void;
  onExport: () => void;
}

const ProgressControls: React.FC<ProgressControlsProps> = ({ onImport, onExport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImport(file);
    }
    // Reset input so the same file can be imported again if needed
    event.target.value = '';
  };

  return (
    <div className="flex justify-end gap-4 mb-6">
      <button
        onClick={onExport}
        className="px-4 py-2 bg-gray-800 text-white border border-gray-600 font-fsex300 hover:bg-gray-700"
      >
        EXPORT PROGRESS
      </button>
      <button
        onClick={handleImportClick}
        className="px-4 py-2 bg-gray-800 text-white border border-gray-600 font-fsex300 hover:bg-gray-700"
      >
        IMPORT PROGRESS
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ProgressControls;