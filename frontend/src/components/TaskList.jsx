import React from 'react';

const TaskList = ({ tasks, onStatusChange, isOverdue }) => {
  const statusOptions = ['pending', 'in-progress', 'completed'];

  if (tasks.length === 0) {
    return <div className="empty-list">No tasks found</div>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className={`task-card ${isOverdue(task) ? 'overdue' : ''}`}>
          <div className="task-header">
            <div className="task-title-section">
              <h3>{task.title}</h3>
              {isOverdue(task) && <span className="badge overdue-badge">OVERDUE</span>}
              <span className={`badge category-badge`}>{task.category}</span>
              <span className={`badge priority-badge priority-${task.priority}`}>
                {task.priority.toUpperCase()}
              </span>
            </div>
          </div>

          {task.description && (
            <p className="task-description">{task.description}</p>
          )}

          <div className="task-meta">
            <span className="due-date">
              📅 {new Date(task.due_date).toLocaleDateString()}
            </span>
          </div>

          <div className="task-actions">
            <select
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value)}
              className="status-select"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
