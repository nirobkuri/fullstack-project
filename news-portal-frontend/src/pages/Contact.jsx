import { useState } from 'react'
import { submitContact } from '../api/services'
import toast from 'react-hot-toast'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await submitContact(form)
      toast.success('Message sent successfully! We\'ll get back to you soon.')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 fade-up">
      <div className="mb-12 text-center">
        <p className="text-primary font-body text-sm uppercase tracking-widest mb-2">Get In Touch</p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
        <p className="text-gray-400 font-body max-w-xl mx-auto">
          Have a tip, feedback, or question? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Info */}
        <div className="space-y-6">
          {[
            { icon: '📍', label: 'Address', value: '123 News Street, Dhaka, Bangladesh' },
            { icon: '📧', label: 'Email', value: 'contact@newsportal.com' },
            { icon: '📞', label: 'Phone', value: '+880 1700 000000' },
            { icon: '🕐', label: 'Hours', value: 'Mon – Fri, 9am – 6pm' },
          ].map(item => (
            <div key={item.label} className="flex gap-4 bg-surface border border-muted p-5">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-body text-xs text-gray-500 uppercase tracking-widest mb-1">{item.label}</p>
                <p className="font-body text-white text-sm">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="lg:col-span-2 bg-surface border border-muted p-8">
          <h2 className="font-heading text-2xl font-bold text-white mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-sm text-gray-300 mb-2">Your Name</label>
                <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="John Doe" className="input" />
              </div>
              <div>
                <label className="block font-body text-sm text-gray-300 mb-2">Email Address</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required placeholder="you@example.com" className="input" />
              </div>
            </div>

            <div>
              <label className="block font-body text-sm text-gray-300 mb-2">Subject</label>
              <input type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required placeholder="What's this about?" className="input" />
            </div>

            <div>
              <label className="block font-body text-sm text-gray-300 mb-2">Message</label>
              <textarea
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                required
                rows={6}
                placeholder="Write your message here..."
                className="input resize-none"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-center disabled:opacity-50">
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
