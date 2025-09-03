from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..db import get_db

router = APIRouter(prefix="/projects/{project_id}/tasks", tags=["tasks"])

@router.post("/", response_model=schemas.Task)
def create_task(project_id: int, task: schemas.TaskCreate, db: Session = Depends(get_db)):
    """Create a new task for a specific project"""
    # Verify project exists
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    
    db_task = models.Task(**task.dict(), project_id=project_id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.get("/", response_model=List[schemas.Task])
def get_tasks(project_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all tasks for a specific project"""
    # Verify project exists
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    
    tasks = db.query(models.Task).filter(models.Task.project_id == project_id).offset(skip).limit(limit).all()
    return tasks
