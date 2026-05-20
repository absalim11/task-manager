import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Layout, List, CheckCircle2, Circle } from 'lucide-react';
import { taskService } from './services/api';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await taskService.getAll();
      setTasks(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateOrUpdate = async (data) => {
    setFormLoading(true);
    try {
      if (editingTask) {
        const response = await taskService.update(editingTask.id, data);
        setTasks(tasks.map((t) => (t.id === editingTask.id ? response.data.data : t)));
        toast.success('Task updated successfully');
        setEditingTask(null);
      } else {
        const response = await taskService.create(data);
        setTasks([response.data.data, ...tasks]);
        toast.success('Task created successfully');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to save task';
      toast.error(message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'pending' ? 'done' : 'pending';
    const previousTasks = [...tasks];
    setTasks(tasks.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t)));

    try {
      await taskService.update(task.id, { ...task, status: newStatus });
      toast.success(`Task marked as ${newStatus}`);
    } catch (error) {
      setTasks(previousTasks);
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await taskService.delete(id);
      setTasks(tasks.filter((t) => t.id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const doneCount = tasks.filter(t => t.status === 'done').length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            borderRadius: '16px',
            background: '#334155',
            color: '#fff',
          },
        }}
      />
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 py-4 px-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-xl text-white">
            <Layout size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">TaskFlow</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium">
            <CheckCircle2 size={16} />
            <span>{doneCount} Completed</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium">
            <List size={16} />
            <span>{tasks.length} Total</span>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-4">
            <TaskForm
              onSubmit={handleCreateOrUpdate}
              editingTask={editingTask}
              onCancel={() => setEditingTask(null)}
              loading={formLoading}
            />
          </div>

          {/* Right Column: Table Preview */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <List size={20} className="text-indigo-500" />
                  Task Preview
                </h2>
                {loading && (
                  <div className="flex items-center gap-2 text-slate-400 text-sm italic">
                    <div className="w-3 h-3 border-2 border-slate-200 border-t-indigo-500 rounded-full animate-spin" />
                    Syncing...
                  </div>
                )}
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="py-4 pl-6 text-xs font-bold text-slate-400 uppercase tracking-widest w-12">Status</th>
                      <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Task Details</th>
                      <th className="py-4 pr-6 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.length === 0 && !loading ? (
                      <tr>
                        <td colSpan="3" className="py-20 text-center">
                          <div className="flex flex-col items-center gap-2 text-slate-300">
                            <Circle size={48} strokeWidth={1} />
                            <p className="font-medium text-slate-400">Your task list is empty.</p>
                            <p className="text-sm">Start by creating your first task on the left.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      tasks.map((task) => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          onToggleStatus={handleToggleStatus}
                          onDelete={handleDelete}
                          onEdit={(task) => {
                            setEditingTask(task);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
