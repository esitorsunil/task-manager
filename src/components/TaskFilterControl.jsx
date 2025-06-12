import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setStatusFilter } from '../utils/taskSlice';

const TaskFilterControls = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.task.searchQuery);
  const statusFilter = useSelector((state) => state.task.statusFilter);

  return (
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
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
      </div>

      <div className="d-flex gap-3">
        <select
          className="form-select"
          value={statusFilter}
          onChange={(e) => dispatch(setStatusFilter(e.target.value))}
        >
          <option value="">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilterControls;
