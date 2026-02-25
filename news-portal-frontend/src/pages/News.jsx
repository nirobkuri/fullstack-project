import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useNewsStore from '../store/newsStore'
import NewsCard from '../components/NewsCard'
import Spinner from '../components/Spinner'

const CATEGORIES = ['All', 'Politics', 'Sports', 'Technology', 'Entertainment', 'Business', 'Health', 'Science', 'World', 'Other']

const News = () => {
  const { allNews, loading, pages, total, fetchAllNews } = useNewsStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const category = searchParams.get('category') || 'All'

  useEffect(() => {
    const params = { page, limit: 9 }
    if (category !== 'All') params.category = category
    if (search) params.search = search
    fetchAllNews(params)
  }, [category, page])

  const handleSearch = (e) => {
    e.preventDefault()
    const params = { page: 1, limit: 9 }
    if (category !== 'All') params.category = category
    if (search) params.search = search
    fetchAllNews(params)
    setPage(1)
  }

  const handleCategory = (cat) => {
    if (cat === 'All') {
      searchParams.delete('category')
      setSearchParams(searchParams)
    } else {
      setSearchParams({ category: cat })
    }
    setPage(1)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 fade-up">
      {/* Header */}
      <div className="mb-10">
        <p className="text-primary font-body text-sm uppercase tracking-widest mb-1">Explore</p>
        <h1 className="section-title">All News</h1>
        <p className="text-gray-400 font-body">{total} articles available</p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-8 max-w-lg">
        <input
          type="text"
          placeholder="Search news..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input flex-1"
        />
        <button type="submit" className="btn-primary px-6 py-3">Search</button>
      </form>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`font-body text-sm px-4 py-2 border transition-all ${
              (cat === 'All' && category === 'All') || category === cat
                ? 'bg-primary border-primary text-white'
                : 'border-muted text-gray-400 hover:border-primary hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <Spinner size="lg" />
      ) : allNews.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">📰</p>
          <p className="text-gray-400 font-body">No news found. Try a different search or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allNews.map(n => <NewsCard key={n._id} news={n} />)}
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-10 h-10 font-body text-sm border transition-all ${
                p === page
                  ? 'bg-primary border-primary text-white'
                  : 'border-muted text-gray-400 hover:border-primary'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default News
