// src/pages/AllTask.jsx
import TaskTable from '../components/TaskTable';
import { useTaskStore } from '../utils/useTaskStore';
import FilterPanel from '../components/FilterPanel';
import { useEffect } from 'react';

const AllTask = () => {
  const {
    setAllTasks,
    setSearchQuery,
    searchQuery,
    getFilteredTasks,
  } = useTaskStore();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setAllTasks(storedTasks);
  }, [setAllTasks]);

  const filteredTasks = getFilteredTasks();

  return (
    <div>
      <h5>All Tasks</h5>

      <div className="d-flex justify-content-between align-items-center my-3 mt-5 flex-wrap gap-3 ">
        <div
          className="custom-input-group d-flex align-items-center"
          style={{ minWidth: '100px' }}
        >
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
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: '300px' }}
        >
          <img
            src="../../../public/download.svg"
            alt="No Data"
            style={{ maxWidth: '300px', height: 'auto', marginBottom: '1rem' }}
          />
          <p className="text-muted">No tasks available</p>
        </div>
      ) : (
        <TaskTable tasks={filteredTasks} setTasks={() => {}} showSelection={true} />
      )}
    </div>
  );
};

export default AllTask;
