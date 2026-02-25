import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getSingleNews } from '../api/services'
import Spinner from '../components/Spinner'

const SingleNews = () => {
  const { id } = useParams()
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getSingleNews(id)
        setNews(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
    window.scrollTo(0, 0)
  }, [id])

  if (loading) return <Spinner size="lg" />

  if (!news) return (
    <div className="text-center py-20">
      <p className="text-gray-400 font-body">News not found.</p>
      <Link to="/news" className="btn-primary mt-4 inline-block">Back to News</Link>
    </div>
  )

  const date = new Date(news.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <article className="max-w-4xl mx-auto px-4 py-12 fade-up">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-body text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link to="/news" className="hover:text-primary">News</Link>
        <span>/</span>
        <span className="text-gray-300 line-clamp-1">{news.title}</span>
      </div>

      {/* Category & Meta */}
      <div className="flex items-center gap-3 mb-5">
        <span className="badge">{news.category}</span>
        <span className="text-gray-500 font-body text-xs">{date}</span>
        <span className="text-gray-500 font-body text-xs">· {news.views} views</span>
      </div>

      {/* Title */}
      <h1 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
        {news.title}
      </h1>

      {/* Summary */}
      <p className="font-body text-lg text-gray-300 leading-relaxed border-l-4 border-primary pl-5 mb-8">
        {news.summary}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 mb-8 pb-8 border-b border-muted">
        {news.author?.avatar ? (
          <img src={news.author.avatar} alt={news.author.name} className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            {news.author?.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <p className="font-body font-semibold text-white text-sm">{news.author?.name}</p>
          {news.author?.bio && (
            <p className="font-body text-xs text-gray-400">{news.author.bio}</p>
          )}
        </div>
      </div>

      {/* Featured Image */}
      {news.image && (
        <div className="mb-8 overflow-hidden">
          <img
            src={news.image}
            alt={news.title}
            className="w-full max-h-[500px] object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="font-body text-gray-300 leading-relaxed text-base space-y-4 whitespace-pre-line">
        {news.content}
      </div>

      {/* Tags */}
      {news.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-muted">
          {news.tags.map(tag => (
            <span key={tag} className="text-xs font-body border border-muted px-3 py-1 text-gray-400 hover:border-primary hover:text-white transition-colors cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Back */}
      <div className="mt-10">
        <Link to="/news" className="btn-outline inline-block">← Back to News</Link>
      </div>
    </article>
  )
}

export default SingleNews
