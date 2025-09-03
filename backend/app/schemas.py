from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

# Project schemas
class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Task schemas
class TaskBase(BaseModel):
    title: str
    notes: Optional[str] = None

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    project_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Project with tasks
class ProjectWithTasks(Project):
    tasks: List[Task] = []
