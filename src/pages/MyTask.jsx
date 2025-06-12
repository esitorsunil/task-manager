import { useEffect, useState } from 'react';
import TaskTable from '../ReuseComponent/TaskTable';

const MyTask = () => {
  const [myTasks, setMyTasks] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('collabUser'));
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (user?.username) {
      const filtered = allTasks.filter((task) =>
        task.assignees?.some((a) => a.label === user.username) ||
        task.collaborators?.some((c) => c.label === user.username)
      );
      setMyTasks(filtered);
    }
  }, []);

  return (
    <div>
      <h5>My Tasks</h5>
      {/* Search & Filter Inputs */}
      <TaskTable tasks={myTasks} setTasks={setMyTasks} showSelection={true} />
    </div>
  );
};

export default MyTask;
