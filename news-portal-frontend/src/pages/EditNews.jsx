import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSingleNews, updateNews } from '../api/services'
import toast from 'react-hot-toast'
import Spinner from '../components/Spinner'

const CATEGORIES = ['Politics','Sports','Technology','Entertainment','Business','Health','Science','World','Other']

const EditNews = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', content: '', summary: '', category: '', tags: '' })
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getSingleNews(id)
        setForm({
          title: data.title,
          content: data.content,
          summary: data.summary,
          category: data.category,
          tags: data.tags?.join(', ') || '',
        })
        setPreview(data.image || '')
      } catch {
        toast.error('Failed to load news')
      } finally {
        setFetching(false)
      }
    }
    fetch()
  }, [id])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) { setImage(file); setPreview(URL.createObjectURL(file)) }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([k, v]) => formData.append(k, v))
      if (image) formData.append('image', image)
      await updateNews(id, formData)
      toast.success('News updated successfully!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) return <Spinner size="lg" />

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 fade-up">
      <div className="mb-8">
        <p className="text-primary font-body text-sm uppercase tracking-widest mb-1">Dashboard</p>
        <h1 className="section-title">Edit Article</h1>
      </div>

      <div className="bg-surface border border-muted p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-body text-sm text-gray-300 mb-2">Title *</label>
            <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required className="input" />
          </div>

          <div>
            <label className="block font-body text-sm text-gray-300 mb-2">Summary *</label>
            <textarea value={form.summary} onChange={e => setForm({...form, summary: e.target.value})} required maxLength={300} rows={2} className="input resize-none" />
          </div>

          <div>
            <label className="block font-body text-sm text-gray-300 mb-2">Content *</label>
            <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} required rows={8} className="input resize-none" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-sm text-gray-300 mb-2">Category *</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="input">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-body text-sm text-gray-300 mb-2">Tags</label>
              <input type="text" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder="tech, news, global" className="input" />
            </div>
          </div>

          <div>
            <label className="block font-body text-sm text-gray-300 mb-2">Cover Image</label>
            {preview && <img src={preview} alt="preview" className="w-full h-40 object-cover mb-3" />}
            <label className="btn-outline text-sm px-4 py-2 cursor-pointer inline-block">
              Change Image
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>

          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" onClick={() => navigate('/dashboard')} className="btn-outline">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditNews
