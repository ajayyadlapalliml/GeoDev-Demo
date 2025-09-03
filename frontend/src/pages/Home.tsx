import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsApi } from '../lib/api';
import ProjectForm from '../components/ProjectForm';
import ProjectTable from '../components/ProjectTable';
import { useState } from 'react';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: projectsApi.getAll,
  });

  const createProjectMutation = useMutation({
    mutationFn: projectsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setShowForm(false);
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-geo-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg">Error loading projects</div>
        <div className="text-gray-600 mt-2">Please check your connection and try again</div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-semibold text-gray-900">Development Projects</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your real estate development projects and track progress
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            Add Project
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mt-6">
          <ProjectForm
            onSubmit={createProjectMutation.mutate}
            onCancel={() => setShowForm(false)}
            isLoading={createProjectMutation.isPending}
          />
        </div>
      )}

      <div className="mt-8">
        <ProjectTable projects={projects} />
      </div>
    </div>
  );
}
