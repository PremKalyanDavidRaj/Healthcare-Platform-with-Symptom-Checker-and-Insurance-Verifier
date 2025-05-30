import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
        <h2 className="mb-6 text-2xl font-medium text-text">Page Not Found</h2>
        <p className="mb-8 text-text-secondary">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link to="/" className="btn btn-primary flex items-center">
            <Home className="mr-2 h-5 w-5" />
            Return to Home
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="btn btn-outline flex items-center"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;