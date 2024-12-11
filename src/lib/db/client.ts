import { open } from 'lmdb';
import { join } from 'path';

// Initialize LMDB database
const dbPath = process.env.NODE_ENV === 'production' 
  ? '/tmp/task-db'  // Use /tmp in production (Vercel)
  : join(process.cwd(), 'task-db'); // Use local path in development

export const db = open({
  path: dbPath,
  compression: true,
});