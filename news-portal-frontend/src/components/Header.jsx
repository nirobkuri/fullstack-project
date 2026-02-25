import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import toast from 'react-hot-toast'

const Header = () => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
  }

  const navLink = ({ isActive }) =>
    `font-body font-medium text-sm tracking-wide transition-colors ${
      isActive ? 'text-primary' : 'text-gray-300 hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-50 bg-dark/95 backdrop-blur border-b border-muted">
      {/* Top bar */}
      <div className="bg-primary py-1 text-center text-xs font-body tracking-widest text-white uppercase">
        Breaking News — Stay Informed, Stay Ahead
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary flex items-center justify-center">
            <span className="text-white font-heading font-black text-lg">N</span>
          </div>
          <span className="font-heading text-2xl font-bold text-white">
            News<span className="text-primary">Portal</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navLink} end>Home</NavLink>
          <NavLink to="/news" className={navLink}>News</NavLink>
          <NavLink to="/contact" className={navLink}>Contact</NavLink>
        </nav>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm font-body text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover border border-primary" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                {user.name}
              </Link>
              <button onClick={handleLogout} className="btn-primary text-sm px-4 py-2">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline text-sm px-4 py-2">Login</Link>
              <Link to="/register" className="btn-primary text-sm px-4 py-2">Register</Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-t border-muted px-4 py-4 flex flex-col gap-4">
          <NavLink to="/" className={navLink} end onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/news" className={navLink} onClick={() => setMenuOpen(false)}>News</NavLink>
          <NavLink to="/contact" className={navLink} onClick={() => setMenuOpen(false)}>Contact</NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard" className={navLink} onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
              <button onClick={() => { handleLogout(); setMenuOpen(false) }} className="btn-primary text-sm text-left">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline text-sm" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="btn-primary text-sm" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}

export default Header
