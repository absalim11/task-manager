import React, { useState, useEffect } from 'react';

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
    <form onSubmit={handleSubmit} className="mb-8 p-6 border rounded shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="What needs to be done?"
          className="input w-full border p-2 rounded"
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add some details..."
          className="textarea w-full border p-2 rounded"
          disabled={loading}
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className={`btn btn-primary ${loading ? 'loading' : ''}`}
          disabled={loading || !title.trim()}
        >
          {loading ? 'Saving...' : editingTask ? 'Update Task' : 'Add Task'}
        </button>
        {editingTask && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-ghost"
            disabled={loading}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
