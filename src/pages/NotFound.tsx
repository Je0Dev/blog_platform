import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-tech-bg flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        {/* 404 */}
        <div className="relative mb-8">
          <h1 className="font-oswald text-8xl sm:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-tech-cyan to-tech-purple">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-tech-cyan to-tech-purple" />
        </div>

        {/* Message */}
        <h2 className="font-oswald text-2xl sm:text-3xl font-bold mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved. 
          Check the URL or navigate back to the homepage.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-tech-cyan text-black font-medium rounded-lg hover:shadow-glow transition-all"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            to="/tags"
            className="flex items-center gap-2 px-6 py-3 border border-tech-border rounded-lg hover:border-tech-cyan transition-colors"
          >
            <Search className="w-4 h-4" />
            Browse Tags
          </Link>
        </div>

        {/* Terminal-style error */}
        <div className="mt-12 p-4 bg-tech-surface rounded-lg border border-tech-border font-mono text-sm text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <p className="text-tech-green">$ curl https://alex.dev{window.location.pathname}</p>
          <p className="text-gray-400">HTTP/1.1 404 Not Found</p>
          <p className="text-gray-400">Content-Type: application/json</p>
          <p className="text-gray-400 mt-2">{'{'}</p>
          <p className="text-gray-400 pl-4">"error": "Page not found",</p>
          <p className="text-gray-400 pl-4">"message": "The requested resource could not be located",</p>
          <p className="text-gray-400 pl-4">"suggestion": "Try navigating to the homepage"</p>
          <p className="text-gray-400">{'}'}</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
