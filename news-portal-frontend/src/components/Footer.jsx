import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-muted mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary flex items-center justify-center">
                <span className="text-white font-heading font-black text-lg">N</span>
              </div>
              <span className="font-heading text-2xl font-bold text-white">
                News<span className="text-primary">Portal</span>
              </span>
            </Link>
            <p className="text-gray-400 font-body text-sm leading-relaxed max-w-xs">
              Your trusted source for the latest news across politics, sports, technology, entertainment, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 font-body text-sm text-gray-400">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/news" className="hover:text-primary transition-colors">All News</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Login</Link></li>
              <li><Link to="/register" className="hover:text-primary transition-colors">Register</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 font-body text-sm text-gray-400">
              {['Politics', 'Sports', 'Technology', 'Entertainment', 'Business', 'Health'].map(cat => (
                <li key={cat}>
                  <Link to={`/news?category=${cat}`} className="hover:text-primary transition-colors">{cat}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-muted mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-gray-500">
            © {new Date().getFullYear()} NewsPortal. All rights reserved.
          </p>
          <p className="font-body text-xs text-gray-500">
            Built with React + Node.js + MongoDB
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
