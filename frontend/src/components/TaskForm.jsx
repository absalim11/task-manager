import React, { useState, useEffect } from 'react';
import { Plus, Save, X } from 'lucide-react';

const TaskForm = ({ onSubmit, editingTask, onCancel, loading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description });
    if (!editingTask) {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 h-fit sticky top-8">
      <div className="flex items-center gap-2 mb-6">
        <div className={`p-2 rounded-lg ${editingTask ? 'bg-blue-50 text-blue-500' : 'bg-indigo-50 text-indigo-500'}`}>
          {editingTask ? <Edit3 size={20} /> : <Plus size={20} />}
        </div>
        <h2 className="text-xl font-bold text-slate-800">{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 ml-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g. Design Landing Page"
            className="w-full bg-slate-50 border-0 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-300 transition-all"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 ml-1">Description (Optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details about this task..."
            rows="4"
            className="w-full bg-slate-50 border-0 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-300 transition-all resize-none"
            disabled={loading}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-8">
        <button
          type="submit"
          className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white transition-all shadow-lg active:scale-95 ${
            editingTask 
            ? 'bg-blue-500 hover:bg-blue-600 shadow-blue-200' 
            : 'bg-indigo-500 hover:bg-indigo-600 shadow-indigo-200'
          } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={loading || !title.trim()}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            editingTask ? <Save size={18} /> : <Plus size={18} />
          )}
          <span>{loading ? 'Saving Changes...' : editingTask ? 'Update Task' : 'Create Task'}</span>
        </button>

        {editingTask && (
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-500 hover:bg-slate-100 transition-all"
            disabled={loading}
          >
            <X size={18} />
            <span>Cancel</span>
          </button>
        )}
      </div>
    </form>
  );
};

// Re-import icons needed for the title inside component
import { Edit3 } from 'lucide-react';

export default TaskForm;
