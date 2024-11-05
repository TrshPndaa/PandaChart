import React from 'react';

function GanttChart() {
  const ganttData = [
    { 
      id: 1,
      task: 'Design Overview',
      start: 0,
      duration: 3,
      progress: 100,
      progressClass: 'gantt-progress-blue'
    },
    {
      id: 2,
      task: 'Cloud Structure',
      start: 2,
      duration: 4,
      progress: 75,
      progressClass: 'gantt-progress-rose'
    },
    {
      id: 3,
      task: 'UX/UI Packaging',
      start: 5,
      duration: 6,
      progress: 50,
      progressClass: 'gantt-progress-orange'
    }
  ];

  const totalDays = 8;
  const dayWidth = 40;
  
  return (
    <div className="gantt-container">
      <div className="gantt-title">Creative Project</div>
      <div className="gantt-subtitle">GANTT CHART</div>
      <div style={{ width: `${totalDays * dayWidth + 150}px` }}>
        <div className="gantt-header">
          <div className="gantt-task-column">Task</div>
          {Array.from({ length: totalDays }, (_, i) => (
            <div key={i} className="gantt-day">
              {i + 1}
            </div>
          ))}
        </div>
        
        {ganttData.map((task) => (
          <div key={task.id} className="gantt-row">
            <div className="gantt-task-name">{task.task}</div>
            <div className="gantt-bar-container" style={{ marginLeft: `${task.start * dayWidth}px` }}>
              <div 
                className="gantt-progress-bar"
                style={{ width: `${task.duration * dayWidth}px` }}
              >
                <div 
                  className={`gantt-progress ${task.progressClass}`}
                  style={{ width: `${task.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GanttChart;