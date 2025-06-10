import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center text-center min-vh-100 p-3">
      <img
        src="https://www.meesho.com/assets/error_500.svg"
        alt="Error"
        style={{ maxWidth: '100%', width: '100px', marginBottom: '2rem' }}
      />
      <h5 className="mb-3">Page Not Found</h5>
      <p className="mb-4">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
