import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Recommend from './pages/Recommend';
import Layout from './pages/Task';
import MyTask from './pages/MyTask';
import AllTask from './pages/AllTask';
import StarredTask from './pages/StarredTask';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('collabUser');
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

       <Route path="/tasks" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
  <Route index element={<Navigate to="recommend" replace />} />
  <Route path="recommend" element={<Recommend />} />
  <Route path="my" element={<MyTask />} />
  <Route path="all" element={<AllTask />} />
  <Route path="starred" element={<StarredTask />} />
</Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
