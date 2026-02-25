import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../api/services'
import useAuthStore from '../store/authStore'
import toast from 'react-hot-toast'

const Register = () => {
  const { setUser } = useAuthStore()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      const { data } = await registerUser(form)
      setUser(data)
      toast.success(`Welcome, ${data.name}! Account created!`)
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 fade-up">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-primary flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-heading font-black text-2xl">N</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400 font-body text-sm">Join NewsPortal and start publishing</p>
        </div>

        <div className="bg-surface border border-muted p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-body text-sm text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="input"
              />
            </div>

            <div>
              <label className="block font-body text-sm text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="input"
              />
            </div>

            <div>
              <label className="block font-body text-sm text-gray-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Min 6 characters"
                className="input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-muted text-center">
            <p className="font-body text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-semibold">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
