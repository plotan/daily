import { db } from './client';
import type { Task } from './types';

// Counter for auto-incrementing IDs
const getNextId = () => {
  const counter = db.get('counter') || 0;
  db.put('counter', counter + 1);
  return counter + 1;
};

export const taskDb = {
  async create(data: Omit<Task, 'id' | 'completed' | 'createdAt' | 'updatedAt'>) {
    const id = getNextId();
    const task: Task = {
      id,
      ...data,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    await db.put(`task:${id}`, task);
    return task;
  },

  async findMany(options?: { orderBy?: { [key: string]: 'asc' | 'desc' } }) {
    const tasks: Task[] = [];
    for await (const { value } of db.getRange({ start: 'task:', end: 'task;' })) {
      tasks.push(value as Task);
    }

    if (options?.orderBy) {
      const [field, order] = Object.entries(options.orderBy)[0];
      tasks.sort((a: any, b: any) => {
        return order === 'desc' 
          ? new Date(b[field]).getTime() - new Date(a[field]).getTime()
          : new Date(a[field]).getTime() - new Date(b[field]).getTime();
      });
    }

    return tasks;
  },

  async update(id: number, data: Partial<Task>) {
    const task = await db.get(`task:${id}`);
    if (!task) return null;

    const updatedTask = {
      ...task,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    await db.put(`task:${id}`, updatedTask);
    return updatedTask;
  },

  async delete(id: number) {
    await db.remove(`task:${id}`);
  }
};