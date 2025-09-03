-- Geo Development Demo Database Initialization
-- Run this in your Supabase SQL editor

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_name ON projects(name);
CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id);

-- Insert sample data (optional)
INSERT INTO projects (name, description) VALUES
    ('Downtown Office Complex', 'Modern office building development in city center'),
    ('Residential Phase 1', 'First phase of residential community development'),
    ('Shopping Center Renovation', 'Upgrade existing shopping center infrastructure')
ON CONFLICT DO NOTHING;

INSERT INTO tasks (project_id, title, notes) VALUES
    (1, 'Site Survey', 'Complete initial site assessment and measurements'),
    (1, 'Zoning Approval', 'Submit and obtain necessary zoning permits'),
    (1, 'Foundation Design', 'Design foundation structure and specifications'),
    (2, 'Environmental Assessment', 'Conduct environmental impact study'),
    (2, 'Utility Planning', 'Plan water, electricity, and sewage systems'),
    (3, 'Tenant Coordination', 'Coordinate with existing tenants for renovation schedule')
ON CONFLICT DO NOTHING;

-- Grant necessary permissions (adjust based on your Supabase setup)
-- ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
