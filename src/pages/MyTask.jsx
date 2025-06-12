// src/pages/MyTask.jsx
import { useEffect } from 'react';
import TaskTable from '../components/TaskTable';
import FilterPanel from '../components/FilterPanel';
import { useTaskStore } from '../utils/useTaskStore';

const MyTask = () => {
  const {
    setAllTasks,
    setSearchQuery,
    searchQuery,
    getFilteredTasks,
  } = useTaskStore();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('collabUser'));
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (user?.username) {
      const filtered = allTasks.filter(
        (task) =>
          task.assignees?.some((a) => a.label === user.username) ||
          task.collaborators?.some((c) => c.label === user.username)
      );
      setAllTasks(filtered);
    }
  }, [setAllTasks]);

  const filteredTasks = getFilteredTasks();

  return (
    <div>
      <h5>My Tasks</h5>

      <div className="d-flex justify-content-between align-items-center my-3 mt-5 flex-wrap gap-3">
        {/* Search Bar */}
        <div className="custom-input-group d-flex align-items-center" style={{ minWidth: '100px' }}>
          <span className="input-group-text bg-white border-end-0">
            <i className="bi bi-search text-muted"></i>
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <FilterPanel />
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center mt-5">
          <img
            src="../../../public/download.svg"
            alt="No tasks"
            style={{ maxWidth: '300px', width: '100%' }}
          />
          <p className="text-muted mt-3">No tasks assigned to you.</p>
        </div>
      ) : (
        <TaskTable tasks={filteredTasks} setTasks={() => {}} showSelection={true} />
      )}
    </div>
  );
};

export default MyTask;
