import { useEffect, useState } from 'react';
import TaskTable from '../ReuseComponent/TaskTable'; 

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const filtered = allTasks.filter((task) => task.isCompleted);
    setCompletedTasks(filtered);
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4"> Completed Tasks</h3>
      <TaskTable tasks={completedTasks} setTasks={setCompletedTasks} showSelection={true} />
    </div>
  );
};

export default CompletedTasks;
