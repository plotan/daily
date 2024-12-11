import { format } from 'date-fns'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function HistoryPage() {
  const tasks = await prisma.task.findMany({
    orderBy: {
      date: 'desc',
    },
  })

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Task History</h1>
            <Link 
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Tasks
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="border-b last:border-0 p-4 flex items-center justify-between"
            >
              <div>
                <h3 className="font-medium text-gray-900">{task.title}</h3>
                <p className="text-sm text-gray-500">
                  {format(new Date(task.date), 'PPP')}
                </p>
              </div>
              <div>
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
            </div>
          ))}

          {tasks.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No tasks found. Start by adding some tasks!
            </div>
          )}
        </div>
      </div>
    </main>
  )
}