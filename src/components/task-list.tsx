'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { LoadingSpinner } from './ui/loading';
import type { Task } from '@/lib/db';

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/tasks');
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8">
        No tasks found. Start by adding some tasks!
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
          >
            <div>
              <h3 className="font-medium text-gray-900">{task.title}</h3>
              <p className="text-sm text-gray-500">
                {format(new Date(task.date), 'PPP')}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                task.completed
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {task.completed ? 'Completed' : 'Pending'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}