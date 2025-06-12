import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../utils/searchFilterSlice';

const FilterDropdown = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.taskFilter.filter);

  const handleFilterChange = (value) => {
    dispatch(setFilter(value));
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-secondary dropdown-toggle"
        type="button"
        id="filterDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {currentFilter === 'none' ? 'Filter' : currentFilter}
      </button>
      <ul className="dropdown-menu" aria-labelledby="filterDropdown">
        {[
          { label: 'None', value: 'none' },
          { label: 'Completed Tasks', value: 'completed' },
          { label: 'Incomplete Tasks', value: 'incomplete' },
          { label: 'Starred Tasks', value: 'starred' },
          { label: 'Unstarred Tasks', value: 'unstarred' },
          { label: 'Due This Week', value: 'dueThisWeek' },
          { label: 'Assigned by Me', value: 'assignedByMe' },
        ].map((item) => (
          <li key={item.value}>
            <button
              className="dropdown-item"
              onClick={() => handleFilterChange(item.value)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterDropdown;
