import { Task } from '../lib/api';

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 text-lg">No tasks yet</div>
        <div className="text-gray-400 mt-2">Add tasks to track your project progress</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="text-lg font-medium text-gray-900 mb-2">{task.title}</h4>
              {task.notes && (
                <p className="text-gray-600 text-sm mb-3">{task.notes}</p>
              )}
              <div className="flex items-center text-xs text-gray-500">
                <span>Created: {new Date(task.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="ml-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-geo-green text-white">
                Active
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
