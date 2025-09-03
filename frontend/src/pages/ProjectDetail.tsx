import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsApi, tasksApi } from '../lib/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useState } from 'react';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id!);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const queryClient = useQueryClient();

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => projectsApi.getById(projectId),
  });

  const createTaskMutation = useMutation({
    mutationFn: (task: { title: string; notes?: string }) => 
      tasksApi.create(projectId, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      setShowTaskForm(false);
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-geo-blue"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg">Error loading project</div>
        <div className="text-gray-600 mt-2">Please check your connection and try again</div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link to="/" className="text-geo-blue hover:text-blue-700 flex items-center">
          ← Back to Projects
        </Link>
      </div>

      <div className="card mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">{project.name}</h1>
            {project.description && (
              <p className="mt-2 text-gray-600">{project.description}</p>
            )}
            <p className="mt-2 text-sm text-gray-500">
              Created: {new Date(project.created_at).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => setShowTaskForm(true)}
            className="btn-primary"
          >
            Add Task
          </button>
        </div>
      </div>

      {showTaskForm && (
        <div className="mb-6">
          <TaskForm
            onSubmit={createTaskMutation.mutate}
            onCancel={() => setShowTaskForm(false)}
            isLoading={createTaskMutation.isPending}
          />
        </div>
      )}

      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Tasks</h2>
        <TaskList tasks={project.tasks} />
      </div>
    </div>
  );
}
