import React from 'react';

const TaskItem = ({ task, onToggleStatus, onDelete, onEdit }) => {
  return (
    <div className="card mb-4 p-4 border rounded shadow-sm flex justify-between items-center">
      <div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={task.status === 'done'}
            onChange={() => onToggleStatus(task)}
            className="w-5 h-5 cursor-pointer"
          />
          <h3 className={`text-lg font-semibold ${task.status === 'done' ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </h3>
        </div>
        {task.description && (
          <p className={`mt-1 text-gray-600 ${task.status === 'done' ? 'line-through' : ''}`}>
            {task.description}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="btn btn-outline btn-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="btn btn-error btn-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
