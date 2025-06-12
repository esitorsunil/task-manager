import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const dummyCollaborators = [
  { id: 1, username: 'sunil', password: 'password1' },
  { id: 2, username: 'collab2', password: 'pass2' },
  { id: 3, username: 'collab3', password: 'pass3' },
  { id: 4, username: 'collab4', password: 'pass4' },
  { id: 5, username: 'collab5', password: 'pass5' },
  { id: 6, username: 'collab6', password: 'pass6' },
  { id: 7, username: 'collab7', password: 'pass7' },
  { id: 8, username: 'collab8', password: 'pass8' },
  { id: 9, username: 'collab9', password: 'pass9' },
  { id: 10, username: 'collab10', password: 'pass10' },
];

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

 const onSubmit = (data) => {
  const user = dummyCollaborators.find(
    (u) => u.username === data.username && u.password === data.password
  );
  if (user) {
    const token = `token-${user.username}-${user.id}`;
    localStorage.setItem('authToken', token); 
    localStorage.setItem('collabUser', JSON.stringify(user));
    navigate('/dashboard'); 
  } else {
    alert('Invalid credentials');
  }
};
;

  return (
  <div className="container d-flex justify-content-center align-items-center min-vh-100 px-3">
  <div className="card shadow p-4 w-100" style={{ maxWidth: '400px' }}>
    <h3 className="mb-4 text-center">Collaborator Login</h3>
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          className={`form-control ${errors.username ? 'is-invalid' : ''}`}
          placeholder="Enter username"
          {...register('username', {
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Minimum 3 characters required',
            },
          })}
        />
        {errors.username && (
          <div className="invalid-feedback">{errors.username.message}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="form-label">Password</label>
        <input
          type="password"
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          placeholder="Enter password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 4,
              message: 'Minimum 4 characters required',
            },
          })}
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Login
      </button>
    </form>
  </div>
</div>

  );
};

export default Login;
