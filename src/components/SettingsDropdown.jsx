// SettingsDropdown.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVisibleColumns } from '../utils/taskColumnSlice';

const ALL_COLUMNS = [
  { key: 'dueDate', label: 'Due Date' },
  { key: 'assignees', label: 'Assignees' },
  { key: 'assignedBy', label: 'Assigned By' },
  { key: 'createdAt', label: 'Created Date' },
  { key: 'updatedAt', label: 'Last Modified' },
  { key: 'status', label: 'Status' },
  { key: 'priority', label: 'Priority' },
  { key: 'collaborators', label: 'Collaborators' },
  { key: 'attachments', label: 'Attachments' },
  { key: 'id', label: 'ID' },
];

const SettingsDropdown = () => {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.taskColumn.visibleColumns);
  const [localSelection, setLocalSelection] = useState(selected);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleSelection = (key) => {
    setLocalSelection((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleSave = () => {
    dispatch(setVisibleColumns(localSelection));
    setShowDropdown(false);
  };

  return (
    <div className="position-relative">
      <button className="btn btn-outline-secondary" onClick={() => setShowDropdown(!showDropdown)}>
        <i className="bi bi-gear-fill"></i> Settings
      </button>

      {showDropdown && (
        <div className="dropdown-menu show p-3" style={{ minWidth: '200px' }}>
          {ALL_COLUMNS.map(({ key, label }) => (
            <div key={key} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={localSelection.includes(key)}
                onChange={() => toggleSelection(key)}
                id={key}
              />
              <label className="form-check-label" htmlFor={key}>
                {label}
              </label>
            </div>
          ))}
          <button className="btn btn-sm btn-primary mt-2" onClick={handleSave}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default SettingsDropdown;
