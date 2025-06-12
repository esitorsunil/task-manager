import { useEffect, useState } from 'react';
import TaskTable from '../ReuseComponent/TaskTable';

const StarredTask = () => {
  const [starredTasks, setStarredTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('starredTasks')) || [];
    setStarredTasks(stored);
    setFilteredTasks(stored);
  }, []);

  useEffect(() => {
    let filtered = [...starredTasks];

    if (statusFilter) {
      filtered = filtered.filter((task) =>
        statusFilter === 'completed' ? task.isCompleted : !task.isCompleted
      );
    }

    setFilteredTasks(filtered);
  }, [statusFilter, starredTasks]);

  return (
    <div>
      <h5>Starred Tasks</h5>

      <TaskTable
        tasks={filteredTasks}
        setTasks={setFilteredTasks}
        showSelection={true}
      />
    </div>
  );
};

export default StarredTask;
