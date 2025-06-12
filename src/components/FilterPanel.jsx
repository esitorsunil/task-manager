// src/components/FilterPanel.jsx
import { useTaskStore } from '../utils/useTaskStore';

const filters = [
  { label: 'None', value: '' },
  { label: 'Completed', value: 'completed' },
  { label: 'Incomplete', value: 'incomplete' },
  { label: 'Starred', value: 'starred' },
  { label: 'Unstarred', value: 'unstarred' },
  { label: 'Due This Week', value: 'dueThisWeek' },
  { label: 'Assigned By Me', value: 'assignedBy' },
];

const FilterPanel = () => {
  const {
    filterPanelOpen,
    toggleFilterPanel,
    setActiveFilter,
    activeFilter,
    closeFilterPanel,
  } = useTaskStore();

  return (
    <div className="position-relative me-5">
      <button className="btn btn-outline-secondary" onClick={toggleFilterPanel}>
        <i className="bi bi-funnel"></i>
      </button>

      {filterPanelOpen && (
        <div
          className="position-absolute bg-white shadow p-3 mt-2 rounded"
          style={{ minWidth: '150px', zIndex: 10 }}
        >
          <h6 className="mb-2">Filter by:</h6>
          <ul className="list-unstyled mb-0">
            {filters.map((filter) => (
              <li key={filter.value} className="my-1">
                <button
                  className={`btn btn-sm w-100 text-start ${
                    activeFilter === filter.value ? 'btn-primary' : 'btn-light'
                  }`}
                  onClick={() => {
                    setActiveFilter(filter.value);
                    closeFilterPanel();
                  }}
                >
                  {filter.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
