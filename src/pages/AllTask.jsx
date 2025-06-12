import { useEffect, useState } from 'react';
import TaskTable from '../ReuseComponent/TaskTable';

const AllTask = () => {
  const [tasks, setTasks] = useState([]);
  

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  return (
    <div>
      <h5>All Tasks</h5>
      {/* Search & Filter Inputs */}
      <TaskTable tasks={tasks} setTasks={setTasks} showSelection={true} />
    </div>
  );
};

export default AllTask;
