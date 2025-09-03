import { useState } from 'react';
import { CreateTaskRequest } from '../lib/api';

interface TaskFormProps {
  onSubmit: (task: CreateTaskRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function TaskForm({ onSubmit, onCancel, isLoading }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit({
        title: formData.title.trim(),
        notes: formData.notes.trim() || undefined,
      });
    }
  };

  return (
    <div className="card">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Task</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Task Title *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="input-field"
            placeholder="e.g., Zoning Approval, Foundation Work"
            required
          />
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="input-field"
            rows={3}
            placeholder="Additional details, requirements, or notes..."
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading || !formData.title.trim()}
          >
            {isLoading ? 'Adding...' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
}
