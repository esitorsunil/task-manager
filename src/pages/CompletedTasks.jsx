// src/pages/CompletedTasks.jsx
import { useEffect } from 'react';
import TaskTable from '../components/TaskTable';
import FilterPanel from '../components/FilterPanel';
import { useTaskStore } from '../utils/useTaskStore';

const CompletedTasks = () => {
  const {
    setAllTasks,
    setSearchQuery,
    searchQuery,
    getFilteredTasks,
  } = useTaskStore();

  useEffect(() => {
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const completed = allTasks.filter((task) => task.isCompleted);
    setAllTasks(completed);
  }, [setAllTasks]);

  const filteredTasks = getFilteredTasks();

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Completed Tasks</h3>

      <div className="d-flex justify-content-between align-items-center my-3 flex-wrap gap-3">
        {/* Search Input */}
        <div className="custom-input-group d-flex align-items-center" style={{ minWidth: '100px' }}>
          <span className="input-group-text bg-white border-end-0">
            <i className="bi bi-search text-muted"></i>
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search"
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
          <p className="text-muted mt-3">No completed tasks found.</p>
        </div>
      ) : (
        <TaskTable tasks={filteredTasks} setTasks={() => {}} showSelection={true} />
      )}
    </div>
  );
};

export default CompletedTasks;
