import React from 'react';
import { CheckCircle, Circle, Edit3, Trash2 } from 'lucide-react';

const TaskItem = ({ task, onToggleStatus, onDelete, onEdit }) => {
  const isDone = task.status === 'done';

  return (
    <tr className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
      <td className="py-4 pl-4 w-12">
        <button
          onClick={() => onToggleStatus(task)}
          className={`flex items-center justify-center transition-all ${
            isDone ? 'text-emerald-500 hover:text-emerald-600' : 'text-slate-300 hover:text-slate-400'
          }`}
        >
          {isDone ? <CheckCircle size={22} fill="currentColor" fillOpacity={0.1} /> : <Circle size={22} />}
        </button>
      </td>
      <td className="py-4 pr-4">
        <div className="flex flex-col">
          <span className={`font-medium text-slate-700 transition-all ${isDone ? 'line-through text-slate-400' : ''}`}>
            {task.title}
          </span>
          {task.description && (
            <span className={`text-xs text-slate-400 mt-0.5 max-w-xs truncate ${isDone ? 'line-through opacity-60' : ''}`}>
              {task.description}
            </span>
          )}
        </div>
      </td>
      <td className="py-4 pr-4 text-right">
        <div className="flex justify-end gap-1">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
            title="Edit Task"
          >
            <Edit3 size={18} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
            title="Delete Task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TaskItem;
