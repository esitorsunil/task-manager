import { useEffect, useState } from 'react';

const MyTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Assignees</th>
                <th>Collaborators</th>
                <th>Attachments</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.taskTitle}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.status}</td>
                  <td>{task.priority}</td>
                  <td>
                    {task.assignees.map((a) => a.label).join(', ')}
                  </td>
                  <td>
                    {task.collaborators.map((c) => c.label).join(', ')}
                  </td>
                  <td>
                    <ul className="list-unstyled mb-0">
                      {task.attachments.map((file, i) => (
                        <li key={i}>
                          <i className="bi bi-paperclip me-1"></i>{file}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{task.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyTask;
