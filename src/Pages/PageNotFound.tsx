import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-lg text-gray-600">
          Oops! The page you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 rounded-lg"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
