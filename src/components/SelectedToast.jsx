// components/SelectedToast.jsx
import React from 'react';

const SelectedToast = ({ count, onDeleteClick, onClearSelection }) => {
  if (count <= 0) return null;

  return (
    <div className="toast-container position-fixed bottom-0 start-50 translate-middle-x p-3" style={{ zIndex: 9999 }}>
      <div className="toast show align-items-center text-white bg-primary border-0 rounded-5">
        <div className="d-flex justify-content-between align-items-center px-3 py-3">
          <div className="me-3 text-truncate">
            {count} task{count > 1 ? 's' : ''} selected
          </div>
          <div className="d-flex align-items-center">
            <i
              className="bi bi-trash me-3"
              style={{ cursor: 'pointer' }}
              onClick={onDeleteClick}
            ></i>
            <i
              className="bi bi-x-lg"
              style={{ cursor: 'pointer' }}
              onClick={onClearSelection}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedToast;
