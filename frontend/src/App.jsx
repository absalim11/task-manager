import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
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
      console.error(error);
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
    
    // Optimistic update
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Toaster position="top-right" />
      
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-2">My To-Do App</h1>
        <p className="text-gray-500">Manage your tasks efficiently</p>
      </header>

      <TaskForm
        onSubmit={handleCreateOrUpdate}
        editingTask={editingTask}
        onCancel={() => setEditingTask(null)}
        loading={formLoading}
      />

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Tasks</h2>
          {loading && <span className="text-sm text-gray-500">Refreshing...</span>}
        </div>

        {tasks.length === 0 && !loading ? (
          <div className="text-center py-12 border-2 border-dashed rounded-lg bg-gray-50">
            <p className="text-gray-500">No tasks found. Add one to get started!</p>
          </div>
        ) : (
          <div>
            {tasks.map((task) => (
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
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
