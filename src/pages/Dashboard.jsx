import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('collabUser'));

  const handleLogout = () => {
    localStorage.removeItem('collabUser');
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="container-fluid">
      <div className="row bg-white text-primary p-3 border-bottom shadow-sm">
  <div className="col-12 d-flex justify-content-between align-items-center">
    <img
      src="https://us05st2.zoom.us/static/6.3.37056/image/new/topNav/Zoom_logo.svg"
      alt="Zoom Logo"
      className="img-fluid"
      style={{ maxHeight: '40px' }}
    />
    <h4 className="m-0">Welcome, {user?.username}</h4>
  </div>
</div>

      <div className="row">
       <div className="sidebar col-md-3 col-12 col-lg-2 p-3 min-vh-100 shadow-sm ">
  <ul className="nav flex-column">
    <li className="nav-item mb-2">
      <button className="btn btn-sidebar w-100 text-start">Profile</button>
    </li>
    <li className="nav-item mb-2">
  <button
    className="btn btn-sidebar w-100 text-start"
    onClick={() => navigate('/tasks')}
  >
    Tasks
  </button>
</li>
    <li className="nav-item">
      <button onClick={handleLogout} className="btn btn-sidebar w-100 text-start">
        Logout
      </button>
    </li>
  </ul>
</div>
        <div className="col-md-9 col-lg-10 p-4">
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
