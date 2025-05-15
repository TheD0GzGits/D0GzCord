import  { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-discord-darkest flex flex-col items-center justify-center text-white p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-discord-blue mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <button
          className="btn btn-primary px-8"
          onClick={() => navigate('/')}
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;
 