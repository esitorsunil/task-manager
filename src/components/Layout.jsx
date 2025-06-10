import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useModalStore } from '../utils/modalStore';
import CreateTaskModal from './CreateTaskModal';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal } = useModalStore();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="sidebar col-md-2 col-lg-2 p-3 min-vh-100 border-end bg-white"
          style={{ maxWidth: '240px' }}
        >
          <div className="sidebar-header mb-4 mt-3 d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Tasks</h5>
        <div
          className="position-relative d-inline-block"
          onMouseEnter={() => document.getElementById('tooltip-create').style.display = 'block'}
          onMouseLeave={() => document.getElementById('tooltip-create').style.display = 'none'}
        >
          <i
            className="bi bi-plus-lg bg-primary text-white fs-5 ps-1 pe-1 rounded"
            role="button"
             onClick={openModal}
          ></i>
             <CreateTaskModal />
          <div
            id="tooltip-create"
            className="position-absolute top-100 start-50 translate-middle-x mt-1 px-2 py-1 rounded shadow-sm border text-dark"
            style={{
              backgroundColor: 'white',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              zIndex: 999,
              display: 'none',
            }}
          >
            Create Task
          </div>
          </div>
          </div>

          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <button
                className={`btn btn-sidebar w-100 text-start d-flex align-items-center gap-2 ${isActive('/tasks/recommend') ? 'bg-primary text-white' : ''}`}
                onClick={() => navigate('/tasks/recommend')}
              >
                <i className="bi bi-stars"></i> Recommended
              </button>
            </li>
            <li className="nav-item mb-2">
              <button
                className={`btn btn-sidebar w-100 text-start d-flex align-items-center gap-2 ${isActive('/tasks/my') ? 'bg-primary text-white' : ''}`}
                onClick={() => navigate('/tasks/my')}
              >
                <i className="bi bi-card-checklist"></i> My Tasks
              </button>
            </li>
            <li className="nav-item mb-2">
              <button
                className={`btn btn-sidebar w-100 text-start d-flex align-items-center gap-2 ${isActive('/tasks/all') ? 'bg-primary text-white' : ''}`}
                onClick={() => navigate('/tasks/all')}
              >
                <i className="bi bi-menu-up"></i> All Tasks
              </button>
            </li>
            <li className="nav-item mb-2">
              <button
                className={`btn btn-sidebar w-100 text-start d-flex align-items-center gap-2 ${isActive('/tasks/starred') ? 'bg-primary text-white' : ''}`}
                onClick={() => navigate('/tasks/starred')}
              >
                <i className="bi bi-star"></i> Starred Tasks
              </button>
            </li>
          </ul>
        </div>

        <div className="col-md-10 col-lg-10 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
