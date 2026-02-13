from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from datetime import datetime
from sqlmodel import Session, select
from uuid import UUID

import crud, models, schemas
from auth import get_current_user
from serverless_db import get_session

router = APIRouter()

@router.get("/tasks", response_model=List[schemas.TaskOut])
async def get_tasks(
    status_param: Optional[str] = Query(None, alias="status", regex="^(all|pending|completed)$"),
    sort: Optional[str] = Query(None, regex="^(created|title)$"),
    current_user_id: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Get all tasks for the authenticated user.
    """
    # Get tasks for the current user
    tasks = crud.get_tasks_by_user(
        session=session,
        user_id=current_user_id,
        status=status_param,
        sort=sort
    )
    
    return tasks


@router.post("/tasks", response_model=schemas.TaskOut, status_code=status.HTTP_201_CREATED)
async def create_task(
    task_create: schemas.TaskCreate,
    current_user_id: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Create a new task for the authenticated user.
    """
    # Create the task
    task = crud.create_task(
        session=session,
        user_id=current_user_id,
        task_data=task_create
    )
    
    return task


@router.get("/tasks/{task_id}", response_model=schemas.TaskOut)
async def get_task(
    task_id: int,
    current_user_id: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Get a specific task by ID.
    """
    # Get the task
    task = crud.get_task_by_id_and_user(
        session=session,
        task_id=task_id,
        user_id=current_user_id
    )
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    return task


@router.put("/tasks/{task_id}", response_model=schemas.TaskOut)
async def update_task(
    task_id: int,
    task_update: schemas.TaskUpdate,
    current_user_id: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Update a specific task by ID.
    """
    # Update the task
    task = crud.update_task_by_id_and_user(
        session=session,
        task_id=task_id,
        user_id=current_user_id,
        task_data=task_update
    )
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    return task


@router.delete("/tasks/{task_id}")
async def delete_task(
    task_id: int,
    current_user_id: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Delete a specific task by ID.
    """
    # Delete the task
    success = crud.delete_task_by_id_and_user(
        session=session,
        task_id=task_id,
        user_id=current_user_id
    )

    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return {"status": "success", "message": "Task deleted successfully", "deleted_id": task_id}


@router.patch("/tasks/{task_id}/complete", response_model=schemas.TaskOut)
async def toggle_complete_task(
    task_id: int,
    current_user_id: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Toggle the completed status of a specific task.
    """
    # Toggle the task completion status
    task = crud.toggle_task_completion_by_id_and_user(
        session=session,
        task_id=task_id,
        user_id=current_user_id
    )
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    return task