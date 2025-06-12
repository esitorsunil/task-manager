import { useEffect, useState } from 'react';
import TaskTable from '../components/TaskTable';

const StarredTask = () => {
  const [starredTasks, setStarredTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('starredTasks')) || [];
    setStarredTasks(stored);
    setFilteredTasks(stored);
  }, []);

  useEffect(() => {
    let filtered = [...starredTasks];

    if (searchQuery) {
      filtered = filtered.filter((task) =>
        task.taskTitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((task) =>
        statusFilter === 'completed' ? task.isCompleted : !task.isCompleted
      );
    }

    setFilteredTasks(filtered);
  }, [searchQuery, statusFilter, starredTasks]);

  return (
    <div>
      <h5>Starred Tasks</h5>

      <div className="d-flex justify-content-between align-items-center my-3 mt-5 flex-wrap gap-3">
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

        <div className="d-flex gap-3">
          <select
            className="form-select"
            aria-label="Filter tasks"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <p>No starred tasks.</p>
      ) : (
        <TaskTable tasks={filteredTasks} setTasks={setFilteredTasks} showSelection={true} />
      )}
    </div>
  );
};

export default StarredTask;
