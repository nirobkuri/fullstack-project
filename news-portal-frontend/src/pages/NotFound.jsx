import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className="min-h-[70vh] flex items-center justify-center text-center px-4 fade-up">
    <div>
      <h1 className="font-heading text-8xl font-black text-primary mb-4">404</h1>
      <p className="font-heading text-3xl font-bold text-white mb-4">Page Not Found</p>
      <p className="font-body text-gray-400 mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn-primary px-8 py-3">Go Back Home</Link>
    </div>
  </div>
)

export default NotFound
