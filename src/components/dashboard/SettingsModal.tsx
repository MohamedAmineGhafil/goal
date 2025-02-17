// src/components/dashboard/SettingsModal.tsx
import React from 'react';
import RetroWindow from '../common/RetroWindow';

interface SettingsModalProps {
  onClose: () => void;
  onDeleteCategory: (categoryId: string) => void;
  categories: Record<string, { title: string }>;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  onClose,
  onDeleteCategory,
  categories
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <RetroWindow 
        title="Settings"
        className="w-full max-w-md"
      >
        <div className="space-y-4">
          <div className="border-b-2 border-gray-700 pb-4">
            <h3 className="text-red-500 font-fsex300 mb-2">Danger Zone</h3>
            <p className="text-gray-400 text-sm mb-4">
              Be careful! These actions cannot be undone.
            </p>
            
            {/* Category Deletion */}
            <div className="space-y-2">
              {Object.entries(categories).map(([id, category]) => (
                <div key={id} className="flex justify-between items-center p-2 bg-gray-700">
                  <span className="font-fsex300">{category.title}</span>
                  <button
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete ${category.title}?`)) {
                        onDeleteCategory(id);
                      }
                    }}
                    className="px-3 py-1 bg-red-600 text-white hover:bg-red-700 font-fsex300"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-700 text-white hover:bg-gray-600 font-fsex300"
          >
            Close
          </button>
        </div>
      </RetroWindow>
    </div>
  );
};

export default SettingsModal;