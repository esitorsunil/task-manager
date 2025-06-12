import { useState } from 'react';

const TaskTable = ({ tasks, setTasks, showSelection = false }) => {
  const [selectedTasks, setSelectedTasks] = useState([]);

  const handleTaskCompletion = (taskId) => {
    const updated = tasks.map((t) =>
      t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
  };

  const handleStarToggle = (taskId) => {
    const updated = tasks.map((t) =>
      t.id === taskId ? { ...t, isStarred: !t.isStarred } : t
    );
    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));

    const updatedTask = updated.find((t) => t.id === taskId);
    let starredTasks = JSON.parse(localStorage.getItem('starredTasks')) || [];
    if (updatedTask.isStarred) {
      if (!starredTasks.some((t) => t.id === updatedTask.id)) {
        starredTasks.push(updatedTask);
      }
    } else {
      starredTasks = starredTasks.filter((t) => t.id !== updatedTask.id);
    }
    localStorage.setItem('starredTasks', JSON.stringify(starredTasks));
  };

  const handleSelectionToggle = (taskId) => {
    const updated = selectedTasks.includes(taskId)
      ? selectedTasks.filter((id) => id !== taskId)
      : [...selectedTasks, taskId];
    setSelectedTasks(updated);
  };

  const handleDelete = () => {
  const updatedTasks = tasks.filter((t) => !selectedTasks.includes(t.id));
  setTasks(updatedTasks);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));

  // Update starredTasks in localStorage
  const starredTasks = JSON.parse(localStorage.getItem('starredTasks')) || [];
  const updatedStarredTasks = starredTasks.filter(
    (t) => !selectedTasks.includes(t.id)
  );
  localStorage.setItem('starredTasks', JSON.stringify(updatedStarredTasks));

  setSelectedTasks([]);
};

  return (
    <>
      <div className="scroll-container">
        <table
          className="table align-middle table-borderless table-hover mt-3"
          style={{ minWidth: '1400px' }}
        >
          <thead className="bg-light">
            <tr className="align-middle border-bottom text-secondary">
              <th
                style={{
                  position: 'sticky',
                  left: 0,
                  width: '400px',
                  zIndex: 2,
                  backgroundColor: '#f8f9fa',
                }}
                className="py-3 px-3"
              >
                <div className="d-flex align-items-center gap-2 me-6">
                  {showSelection && <i className="bi bi-square fs-6"></i>}
                  <span style={{ minWidth: '300px', whiteSpace: 'nowrap' }}>
                    Tasks
                  </span>
                </div>
              </th>
              <th className="py-3 px-3">Due Date</th>
              <th className="py-3 px-3">Assignees</th>
              <th className="py-3 px-3">Assigned by</th>
              <th className="py-3 px-3">Created Date</th>
              <th className="py-3 px-3">Last Modified</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">Priority</th>
              <th className="py-3 px-3">Collaborators</th>
              <th className="py-3 px-3">Attachments</th>
              <th className="py-3 px-3">ID</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-bottom">
                <td
                  className="py-3 px-3"
                  style={{
                    position: 'sticky',
                    left: 0,
                    backgroundColor: '#fff',
                    zIndex: 1,
                  }}
                >
                  <div className="d-flex align-items-center gap-2">
                    {showSelection && (
                      <i
                        className={`bi fs-5 cursor-pointer ${
                          selectedTasks.includes(task.id)
                            ? 'bi-check-square-fill text-success'
                            : 'bi-square'
                        }`}
                        onClick={() => handleSelectionToggle(task.id)}
                      ></i>
                    )}
                    <i
                      className={`bi ps-3 fs-5 ${
                        task.isCompleted
                          ? 'bi-check-circle-fill text-success'
                          : 'bi-circle'
                      } cursor-pointer`}
                      onClick={() => handleTaskCompletion(task.id)}
                    ></i>

                    <i
                      className={`bi fs-5 ${
                        task.isStarred ? 'bi-star-fill text-warning' : 'bi-star'
                      } cursor-pointer`}
                      onClick={() => handleStarToggle(task.id)}
                    ></i>

                    <span>{task.taskTitle}</span>
                  </div>
                </td>
                <td className="py-3 px-3">{task.dueDate || ''}</td>
                <td className="py-3 px-3">
                  {task.assignees?.map((a) => a.label).join(', ') || ''}
                </td>
                <td className="py-3 px-3">
                  {task.assignedBy ||
                    JSON.parse(localStorage.getItem('collabUser'))?.username ||
                    ''}
                </td>
                <td className="py-3 px-3">
                  {new Date(task.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-3">
                  {new Date(task.updatedAt || task.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-3">{task.status || ''}</td>
                <td className="py-3 px-3">{task.priority || ''}</td>
                <td className="py-3 px-3">
                  {task.collaborators?.map((c) => c.label).join(', ') || ''}
                </td>
                <td className="py-3 px-3">
                  {task.attachments && task.attachments.length > 0 ? (
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-sm p-0"
                        onClick={() => {
                          const index = task._currentFileIndex || 0;
                          const newIndex =
                            (index - 1 + task.attachments.length) %
                            task.attachments.length;
                          const updated = tasks.map((t) =>
                            t.id === task.id
                              ? { ...t, _currentFileIndex: newIndex }
                              : t
                          );
                          setTasks(updated);
                        }}
                      >
                        <i className="bi bi-chevron-left"></i>
                      </button>

                      <a
                        href={task.attachments[task._currentFileIndex || 0]?.content}
                        download={task.attachments[task._currentFileIndex || 0]?.name}
                        className="text-decoration-none text-primary small"
                        style={{
                          maxWidth: '150px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                        title={task.attachments[task._currentFileIndex || 0]?.name}
                      >
                        <i className="bi bi-paperclip"></i>{' '}
                        {task.attachments[task._currentFileIndex || 0]?.name}
                      </a>

                      <button
                        className="btn btn-sm p-0"
                        onClick={() => {
                          const index = task._currentFileIndex || 0;
                          const newIndex =
                            (index + 1) % task.attachments.length;
                          const updated = tasks.map((t) =>
                            t.id === task.id
                              ? { ...t, _currentFileIndex: newIndex }
                              : t
                          );
                          setTasks(updated);
                        }}
                      >
                        <i className="bi bi-chevron-right"></i>
                      </button>
                    </div>
                  ) : (
                    <span className="text-muted small">No attachments</span>
                  )}
                </td>
                <td className="py-3 px-3 text-muted small">{task.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showSelection && selectedTasks.length > 0 && (
        <div
          className="toast-container position-fixed bottom-0 start-50 translate-middle-x p-3"
          style={{ zIndex: 9999 }}
        >
          <div className="toast show align-items-center text-white bg-primary border-0 rounded-5">
            <div className="d-flex justify-content-between align-items-center px-3 py-3">
              <div className="me-3 text-truncate">
                {selectedTasks.length} task
                {selectedTasks.length > 1 ? 's' : ''} selected
              </div>
              <div className="d-flex align-items-center">
                <i
                  className="bi bi-trash me-3"
                  style={{ cursor: 'pointer' }}
                  onClick={handleDelete}
                ></i>
                <i
                  className="bi bi-x-lg"
                  onClick={() => setSelectedTasks([])}
                  style={{ cursor: 'pointer' }}
                ></i>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskTable;
