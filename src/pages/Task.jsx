// components/Layout.jsx
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div
          className="sidebar col-md-2 col-lg-2 p-3 min-vh-100 border-end bg-white"
          style={{ maxWidth: '240px' }}
        >
          <div className="sidebar-header mb-4 mt-3 d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Tasks</h5>
            <i
              className="bi bi-plus-lg bg-primary text-white fs-5 ps-1 pe-1 rounded"
              role="button"
            ></i>
          </div>

          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <button
                className="btn btn-sidebar w-100 text-start d-flex align-items-center gap-2"
                onClick={() => navigate('/tasks/recommend')}
              >
                <i className="bi bi-stars"></i> Recommended
              </button>
            </li>
            <li className="nav-item mb-2">
              <button
                className="btn btn-sidebar w-100 text-start d-flex align-items-center gap-2"
                onClick={() => navigate('/tasks/my')}
              >
                <i className="bi bi-card-checklist"></i> My Tasks
              </button>
            </li>
            <li className="nav-item mb-2">
              <button
                className="btn btn-sidebar w-100 text-start d-flex align-items-center gap-2"
                onClick={() => navigate('/tasks/all')}
              >
                <i className="bi bi-menu-up"></i> All Tasks
              </button>
            </li>
            <li className="nav-item mb-2">
              <button
                className="btn btn-sidebar w-100 text-start d-flex align-items-center gap-2"
                onClick={() => navigate('/tasks/starred')}
              >
                <i className="bi bi-star"></i> Starred Tasks
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-10 col-lg-10 p-4">
          <Outlet /> {/* Render child routes here */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
