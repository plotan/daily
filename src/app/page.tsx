import { TaskForm } from '@/components/task-form';
import { TaskList } from '@/components/task-list';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Daily Task Tracker</h1>
          <p className="text-gray-600">Stay organized and productive</p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <TaskForm />
          <TaskList />
          
          <div className="mt-8 text-center">
            <Link 
              href="/history" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View Task History →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}