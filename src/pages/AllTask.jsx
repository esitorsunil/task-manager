import { useEffect, useState } from 'react';

const AllTask = () => {
  const [tasks, setTasks] = useState([]);
  

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  return (
    <div>
      <h5>My Tasks</h5>

      <div className="d-flex justify-content-between align-items-center my-3 mt-5 flex-wrap gap-3">
        <div className="custom-input-group d-flex align-items-center" style={{ minWidth: '100px' }}>
          <span className="input-group-text bg-white border-end-0">
            <i className="bi bi-search text-muted"></i>
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search"
            aria-label="Search"
          />
        </div>

        <div className="d-flex gap-3">
          <select className="form-select" aria-label="Filter tasks">
            <option value="">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
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
                    <i className="bi bi-square fs-6"></i>
                    <span style={{ minWidth: '300px', whiteSpace: 'nowrap' }}>Tasks</span>
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
                    className="py-3 px-3  ps-2"
                    style={{
                      position: 'sticky',
                      left: 0,
                      backgroundColor: '#fff',
                      zIndex: 1,
                    }}
                  >
                    <div className="d-flex align-items-center gap-2 ">
                     <i
  className={`bi ps-5 fs-5 ${task.isCompleted ? 'bi-check-circle-fill text-success' : 'bi-circle'} cursor-pointer`}
  onClick={() => {
    const updatedTasks = tasks.map(t =>
      t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }}
></i>

<i
  className={`bi fs-5 ${task.isStarred ? 'bi-star-fill text-warning' : 'bi-star'} cursor-pointer`}
  onClick={() => {
    const updatedTasks = tasks.map(t =>
      t.id === task.id ? { ...t, isStarred: !t.isStarred } : t
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }}
></i>
                      <span>{task.taskTitle}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">{task.dueDate || ''}</td>
                  <td className="py-3 px-3">{task.assignees?.map(a => a.label).join(', ') || ''}</td>
                  <td className="py-3 px-3">
  {task.assignedBy || JSON.parse(localStorage.getItem('collabUser'))?.username || ''}
</td>
                  <td className="py-3 px-3">{new Date(task.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-3">{new Date(task.updatedAt || task.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-3">{task.status || ''}</td>
                  <td className="py-3 px-3">{task.priority || ''}</td>
                  <td className="py-3 px-3">{task.collaborators?.map(c => c.label).join(', ') || ''}</td>
                  <td className="py-3 px-3">
  {task.attachments && task.attachments.length > 0 ? (
    <div className="d-flex align-items-center gap-2">
      <button
        className="btn btn-sm p-0"
        onClick={() => {
          const index = task._currentFileIndex || 0;
          const newIndex = (index - 1 + task.attachments.length) % task.attachments.length;
          const updated = tasks.map(t =>
            t.id === task.id ? { ...t, _currentFileIndex: newIndex } : t
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
        style={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        title={task.attachments[task._currentFileIndex || 0]?.name}
      >
       <i class="bi bi-paperclip"></i> {task.attachments[task._currentFileIndex || 0]?.name}
      </a>

      <button
        className="btn btn-sm p-0"
        onClick={() => {
          const index = task._currentFileIndex || 0;
          const newIndex = (index + 1) % task.attachments.length;
          const updated = tasks.map(t =>
            t.id === task.id ? { ...t, _currentFileIndex: newIndex } : t
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
      )}
    </div>
  );
};

export default AllTask;
