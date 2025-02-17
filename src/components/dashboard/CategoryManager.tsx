// src/components/dashboard/CategoryManager.tsx
import React, { useState } from 'react';

interface CategoryManagerProps {
  categories: Record<string, { title: string }>;
  onEditCategory: (categoryId: string, newTitle: string) => void;
  onDeleteCategory: (categoryId: string) => void;
  onClose: () => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
  categories,
  onEditCategory,
  onDeleteCategory,
  onClose
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');

  return (
    <div className="bg-gray-800 border-2 border-gray-700 w-full max-w-xl shadow-retro">
      <div className="bg-gray-700 px-4 py-2 flex justify-between items-center">
        <h2 className="text-xl font-fsex300 text-white">Category Manager</h2>
        <button 
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>

      <div className="p-6 space-y-4">
        {Object.entries(categories).map(([id, category]) => (
          <div key={id} className="bg-gray-900 border-2 border-gray-700 p-4">
            {editingId === id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 text-white border-2 border-gray-700 font-fsex300"
                  placeholder="New category name"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (newTitle.trim()) {
                        onEditCategory(id, newTitle);
                        setEditingId(null);
                        setNewTitle('');
                      }
                    }}
                    className="px-4 py-2 bg-green-700 text-white font-fsex300 hover:bg-green-600 border-2 border-green-900"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setNewTitle('');
                    }}
                    className="px-4 py-2 bg-gray-700 text-white font-fsex300 hover:bg-gray-600 border-2 border-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span className="font-fsex300 text-white">{category.title}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(id);
                      setNewTitle(category.title);
                    }}
                    className="px-4 py-2 bg-gray-700 text-white font-fsex300 hover:bg-gray-600 border-2 border-gray-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this category?')) {
                        onDeleteCategory(id);
                      }
                    }}
                    className="px-4 py-2 bg-red-700 text-white font-fsex300 hover:bg-red-600 border-2 border-red-900"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;