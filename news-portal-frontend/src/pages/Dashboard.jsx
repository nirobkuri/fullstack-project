import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { updateUserProfile, getMyNews, deleteNews, createNews } from '../api/services'
import useAuthStore from '../store/authStore'
import toast from 'react-hot-toast'
import Spinner from '../components/Spinner'

const CATEGORIES = ['Politics','Sports','Technology','Entertainment','Business','Health','Science','World','Other']

const Dashboard = () => {
  const { user, updateUser } = useAuthStore()
  const [tab, setTab] = useState('profile')
  const [myNews, setMyNews] = useState([])
  const [newsLoading, setNewsLoading] = useState(false)
  const [profileLoading, setProfileLoading] = useState(false)
  const [form, setForm] = useState({ name: '', bio: '', password: '' })
  const [avatar, setAvatar] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState('')

  useEffect(() => {
    if (user) {
      setForm({ name: user.name || '', bio: user.bio || '', password: '' })
      setAvatarPreview(user.avatar || '')
    }
  }, [user])

  useEffect(() => {
    if (tab === 'news') fetchMyNews()
  }, [tab])

  const fetchMyNews = async () => {
    setNewsLoading(true)
    try {
      const { data } = await getMyNews()
      setMyNews(data)
    } catch { toast.error('Failed to load your news') }
    finally { setNewsLoading(false) }
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) { setAvatar(file); setAvatarPreview(URL.createObjectURL(file)) }
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setProfileLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('bio', form.bio)
      if (form.password) formData.append('password', form.password)
      if (avatar) formData.append('avatar', avatar)
      const { data } = await updateUserProfile(formData)
      updateUser(data)
      toast.success('Profile updated!')
      setForm(prev => ({ ...prev, password: '' }))
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
    } finally { setProfileLoading(false) }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this news article?')) return
    try {
      await deleteNews(id)
      setMyNews(prev => prev.filter(n => n._id !== id))
      toast.success('News deleted!')
    } catch { toast.error('Failed to delete') }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 fade-up">
      <div className="mb-8">
        <p className="text-primary font-body text-sm uppercase tracking-widest mb-1">Account</p>
        <h1 className="section-title">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-surface border border-muted p-6 text-center mb-4">
            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-primary">
              {avatarPreview
                ? <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
                : <div className="w-full h-full bg-primary flex items-center justify-center text-white text-2xl font-bold font-heading">{user?.name?.charAt(0).toUpperCase()}</div>
              }
            </div>
            <p className="font-heading font-bold text-white">{user?.name}</p>
            <p className="text-gray-400 font-body text-xs mt-1">{user?.email}</p>
          </div>
          <div className="bg-surface border border-muted overflow-hidden">
            {[
              { key: 'profile', label: '👤 My Profile' },
              { key: 'news',    label: '📰 My News' },
              { key: 'create',  label: '✏️ Create News' },
            ].map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`w-full text-left px-5 py-4 font-body text-sm border-b border-muted transition-all ${
                  tab === t.key ? 'bg-primary text-white' : 'text-gray-300 hover:bg-muted'
                }`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">

          {/* PROFILE */}
          {tab === 'profile' && (
            <div className="bg-surface border border-muted p-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-6">Update Profile</h2>
              <form onSubmit={handleProfileUpdate} className="space-y-5">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
                    {avatarPreview
                      ? <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
                      : <div className="w-full h-full bg-primary flex items-center justify-center text-white text-xl font-bold">{user?.name?.charAt(0).toUpperCase()}</div>
                    }
                  </div>
                  <div>
                    <label className="btn-outline text-sm px-4 py-2 cursor-pointer">
                      Change Photo
                      <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                    </label>
                    <p className="text-gray-500 font-body text-xs mt-1">JPG, PNG up to 5MB</p>
                  </div>
                </div>
                <div>
                  <label className="block font-body text-sm text-gray-300 mb-2">Full Name</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input" />
                </div>
                <div>
                  <label className="block font-body text-sm text-gray-300 mb-2">Bio</label>
                  <textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} rows={3} placeholder="Tell us about yourself..." className="input resize-none" />
                </div>
                <div>
                  <label className="block font-body text-sm text-gray-300 mb-2">New Password <span className="text-gray-500">(leave blank to keep current)</span></label>
                  <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="••••••••" className="input" />
                </div>
                <button type="submit" disabled={profileLoading} className="btn-primary disabled:opacity-50">
                  {profileLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          )}

          {/* MY NEWS */}
          {tab === 'news' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-2xl font-bold text-white">My Articles</h2>
                <button onClick={() => setTab('create')} className="btn-primary text-sm px-4 py-2">+ New Article</button>
              </div>
              {newsLoading ? <Spinner /> : myNews.length === 0 ? (
                <div className="bg-surface border border-muted p-12 text-center">
                  <p className="text-4xl mb-4">📰</p>
                  <p className="text-gray-400 font-body mb-4">You haven't published any news yet.</p>
                  <button onClick={() => setTab('create')} className="btn-primary">Create Your First Article</button>
                </div>
              ) : (
                <div className="space-y-4">
                  {myNews.map(n => (
                    <div key={n._id} className="bg-surface border border-muted p-5 flex gap-4 hover:border-primary transition-all">
                      <img src={n.image || `https://picsum.photos/seed/${n._id}/200/150`} alt={n.title} className="w-24 h-20 object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="badge text-xs mb-1 inline-block">{n.category}</span>
                            <h3 className="font-heading font-bold text-white line-clamp-1">{n.title}</h3>
                            <p className="text-gray-500 text-xs font-body mt-1">{new Date(n.createdAt).toLocaleDateString()} · {n.views} views</p>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <Link to={`/dashboard/edit/${n._id}`} className="text-xs border border-muted px-3 py-1.5 text-gray-300 hover:border-primary hover:text-white transition-all font-body">Edit</Link>
                            <button onClick={() => handleDelete(n._id)} className="text-xs border border-red-800 px-3 py-1.5 text-red-400 hover:bg-red-900/30 transition-all font-body">Delete</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* CREATE */}
          {tab === 'create' && <CreateNewsForm onSuccess={() => { setTab('news'); fetchMyNews() }} />}
        </div>
      </div>
    </div>
  )
}

const CreateNewsForm = ({ onSuccess }) => {
  const [form, setForm] = useState({ title: '', content: '', summary: '', category: 'Other', tags: '' })
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([k, v]) => formData.append(k, v))
      if (image) formData.append('image', image)
      await createNews(formData)
      toast.success('News published!')
      onSuccess()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create news')
    } finally { setLoading(false) }
  }

  return (
    <div className="bg-surface border border-muted p-8">
      <h2 className="font-heading text-2xl font-bold text-white mb-6">Create New Article</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-body text-sm text-gray-300 mb-2">Title *</label>
          <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required placeholder="Enter news title..." className="input" />
        </div>
        <div>
          <label className="block font-body text-sm text-gray-300 mb-2">Summary * <span className="text-gray-500">(max 300 chars)</span></label>
          <textarea value={form.summary} onChange={e => setForm({...form, summary: e.target.value})} required maxLength={300} rows={2} placeholder="Brief summary..." className="input resize-none" />
          <p className="text-gray-500 text-xs mt-1">{form.summary.length}/300</p>
        </div>
        <div>
          <label className="block font-body text-sm text-gray-300 mb-2">Content *</label>
          <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} required rows={8} placeholder="Write your full article here..." className="input resize-none" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-body text-sm text-gray-300 mb-2">Category *</label>
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="input">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-body text-sm text-gray-300 mb-2">Tags <span className="text-gray-500">(comma separated)</span></label>
            <input type="text" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder="tech, news, global" className="input" />
          </div>
        </div>
        <div>
          <label className="block font-body text-sm text-gray-300 mb-2">Cover Image</label>
          {preview && <img src={preview} alt="preview" className="w-full h-40 object-cover mb-3" />}
          <label className="btn-outline text-sm px-4 py-2 cursor-pointer inline-block">
            Choose Image
            <input type="file" accept="image/*" onChange={e => { const f = e.target.files[0]; if(f){ setImage(f); setPreview(URL.createObjectURL(f)) }}} className="hidden" />
          </label>
        </div>
        <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
          {loading ? 'Publishing...' : 'Publish Article'}
        </button>
      </form>
    </div>
  )
}

export default Dashboard
