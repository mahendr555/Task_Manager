import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Task } from './types/Task';
import { taskApi } from './services/api';
import { CheckCircle2, Trash2, Plus } from 'lucide-react';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    (async () => {
      try {
        setTasks(await taskApi.getTasks());
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const task = await taskApi.createTask(newTitle, newDesc);
    setTasks([...tasks, task]);
    setNewTitle('');
    setNewDesc('');
  };

  const toggleTask = async (id: number) => {
    const updated = await taskApi.toggleTask(id);
    setTasks(tasks.map(t => (t.id === id ? updated : t)));
  };

  const deleteTask = async (id: number) => {
    await taskApi.deleteTask(id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filtered = tasks.filter(t =>
    filter === 'active' ? !t.isCompleted :
      filter === 'completed' ? t.isCompleted : true
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-8 text-white"
      >
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-teal-300 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
          Task Manager
        </h1>

        {/* Add Task */}
        <form onSubmit={addTask} className="mb-6 space-y-3">
          <input
            type="text"
            placeholder="Task title..."
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <input
            type="text"
            placeholder="Task description..."
            value={newDesc}
            onChange={e => setNewDesc(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-teal-400 hover:from-violet-400 hover:to-teal-300 transition-all font-semibold shadow-lg"
          >
            <Plus size={18} /> Add Task
          </button>
        </form>

        {/* Filters */}
        <div className="flex justify-around mb-6">
          {(['all', 'active', 'completed'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${filter === f
                  ? 'bg-gradient-to-r from-violet-500 to-teal-400 text-white shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-gray-300'
                }`}
            >
              {f[0].toUpperCase() + f.slice(1)} ({f === 'active'
                ? tasks.filter(t => !t.isCompleted).length
                : f === 'completed'
                  ? tasks.filter(t => t.isCompleted).length
                  : tasks.length})
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/30">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-300 italic">No tasks found.</p>
          ) : (
            filtered.map(task => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`flex items-center justify-between p-4 rounded-xl transition-all ${task.isCompleted
                    ? 'bg-gradient-to-r from-green-500/20 to-emerald-600/10 border border-green-400/40'
                    : 'bg-white/5 border border-white/20'
                  }`}
              >
                <div
                  onClick={() => toggleTask(task.id)}
                  className={`flex-1 cursor-pointer ${task.isCompleted
                      ? 'line-through text-gray-400'
                      : 'text-white'
                    }`}
                >
                  <div className="font-medium">{task.title}</div>
                  {task.description && (
                    <div className="text-sm text-gray-400">{task.description}</div>
                  )}
                </div>
                <div className="flex gap-2 ml-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="text-emerald-400 hover:text-emerald-300"
                  >
                    <CheckCircle2 size={20} />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
