from sqlmodel import Session, select, update
from typing import List, Optional
from datetime import datetime

from models import Task, TaskCreate, TaskUpdate


def get_tasks_by_user(
    session: Session, 
    user_id: str, 
    status: Optional[str] = None, 
    sort: Optional[str] = None
) -> List[Task]:
    """
    Get all tasks for a specific user, with optional filtering and sorting.
    """
    query = select(Task).where(Task.user_id == user_id)
    
    # Apply status filter if provided
    if status and status != "all":
        if status == "pending":
            query = query.where(Task.completed == False)
        elif status == "completed":
            query = query.where(Task.completed == True)
    
    # Apply sorting if provided
    if sort == "title":
        query = query.order_by(Task.title)
    elif sort == "created":
        query = query.order_by(Task.created_at.desc())
    
    return session.exec(query).all()


def get_task_by_id_and_user(session: Session, task_id: int, user_id: str) -> Optional[Task]:
    """
    Get a specific task by ID and user ID.
    """
    query = select(Task).where(Task.id == task_id).where(Task.user_id == user_id)
    return session.exec(query).first()


def create_task(session: Session, user_id: str, task_data: TaskCreate) -> Task:
    """
    Create a new task for a specific user.
    """
    task = Task(
        title=task_data.title,
        description=task_data.description,
        user_id=user_id
    )
    
    session.add(task)
    session.commit()
    session.refresh(task)
    
    return task


def update_task_by_id_and_user(
    session: Session, 
    task_id: int, 
    user_id: str, 
    task_data: TaskUpdate
) -> Optional[Task]:
    """
    Update a specific task by ID and user ID.
    """
    # Get the task
    task = session.get(Task, task_id)
    
    # Verify the task belongs to the user
    if not task or task.user_id != user_id:
        return None
    
    # Update the task with provided data
    update_data = task_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(task, field, value)
    
    # Update the timestamp
    task.updated_at = datetime.utcnow()
    
    session.add(task)
    session.commit()
    session.refresh(task)
    
    return task


def delete_task_by_id_and_user(session: Session, task_id: int, user_id: str) -> bool:
    """
    Delete a specific task by ID and user ID.
    """
    # Get the task
    task = session.get(Task, task_id)
    
    # Verify the task belongs to the user
    if not task or task.user_id != user_id:
        return False
    
    # Delete the task
    session.delete(task)
    session.commit()
    
    return True


def toggle_task_completion_by_id_and_user(session: Session, task_id: int, user_id: str) -> Optional[Task]:
    """
    Toggle the completion status of a specific task by ID and user ID.
    """
    # Get the task
    task = session.get(Task, task_id)
    
    # Verify the task belongs to the user
    if not task or task.user_id != user_id:
        return None
    
    # Toggle the completion status
    task.completed = not task.completed
    task.updated_at = datetime.utcnow()
    
    session.add(task)
    session.commit()
    session.refresh(task)
    
    return task