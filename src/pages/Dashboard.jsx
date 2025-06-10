import React from 'react';
import { useNavigate } from 'react-router-dom';

const dummyEmployees = [
  { id: 1, name: 'Alice Johnson', role: 'Engineer' },
  { id: 2, name: 'Bob Smith', role: 'Designer' },
  { id: 3, name: 'Charlie Brown', role: 'Product Manager' },
  { id: 4, name: 'David Williams', role: 'Developer' },
  { id: 5, name: 'Ella Davis', role: 'QA Analyst' },
  { id: 6, name: 'Frank Miller', role: 'HR' },
  { id: 7, name: 'Grace Lee', role: 'Engineer' },
  { id: 8, name: 'Henry Wilson', role: 'Support' },
  { id: 9, name: 'Isla Moore', role: 'Marketing' },
  { id: 10, name: 'Jack Taylor', role: 'Finance' },
];

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
