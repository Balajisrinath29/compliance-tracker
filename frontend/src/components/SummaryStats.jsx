import React from 'react';

const SummaryStats = ({ tasks, isOverdue }) => {
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const overdueTasks = tasks.filter(isOverdue).length;

  return (
    <div className="summary-stats">
      <div className="stat-card">
        <div className="stat-value">{totalTasks}</div>
        <div className="stat-label">Total Tasks</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{pendingTasks}</div>
        <div className="stat-label">Pending</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{completedTasks}</div>
        <div className="stat-label">Completed</div>
      </div>
      <div className={`stat-card ${overdueTasks > 0 ? 'danger' : ''}`}>
        <div className="stat-value">{overdueTasks}</div>
        <div className="stat-label">⚠️ Overdue</div>
      </div>
    </div>
  );
};

export default SummaryStats;
