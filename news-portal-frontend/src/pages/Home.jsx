import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useNewsStore from '../store/newsStore'
import NewsCard from '../components/NewsCard'
import Spinner from '../components/Spinner'

const CATEGORIES = ['Politics', 'Sports', 'Technology', 'Entertainment', 'Business', 'Health']

const Home = () => {
  const { topNews, loading, fetchTopNews } = useNewsStore()

  useEffect(() => {
    fetchTopNews()
  }, [])

  const hero = topNews[0]
  const featured = topNews.slice(1, 4)
  const rest = topNews.slice(4, 6)

  return (
    <div className="fade-up">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 pt-10 pb-6">
        {loading ? (
          <Spinner size="lg" />
        ) : hero ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Big hero card */}
            <Link to={`/news/${hero._id}`} className="relative group overflow-hidden block" style={{ minHeight: 420 }}>
              <img
                src={hero.image || `https://picsum.photos/seed/${hero._id}/900/600`}
                alt={hero.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 p-8">
                <span className="badge mb-3 inline-block">{hero.category}</span>
                <h1 className="font-heading text-2xl md:text-3xl font-bold text-white leading-tight mb-3 group-hover:text-accent transition-colors">
                  {hero.title}
                </h1>
                <p className="text-gray-300 font-body text-sm line-clamp-2">{hero.summary}</p>
              </div>
            </Link>

            {/* Side cards */}
            <div className="flex flex-col gap-4">
              {featured.map(n => (
                <Link key={n._id} to={`/news/${n._id}`} className="flex gap-4 bg-surface border border-muted p-4 hover:border-primary transition-all group">
                  <img
                    src={n.image || `https://picsum.photos/seed/${n._id}/200/150`}
                    alt={n.title}
                    className="w-24 h-20 object-cover flex-shrink-0"
                  />
                  <div>
                    <span className="badge text-xs mb-1 inline-block">{n.category}</span>
                    <h3 className="font-heading text-sm font-bold text-white group-hover:text-primary transition-colors line-clamp-2">
                      {n.title}
                    </h3>
                    <p className="text-gray-500 text-xs font-body mt-1 line-clamp-1">{n.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-center py-20">No news available</p>
        )}
      </section>

      {/* ── BREAKING TICKER ──────────────────────────────────── */}
      <div className="bg-primary overflow-hidden py-2">
        <div className="flex items-center gap-0">
          <span className="bg-dark text-white font-body font-bold text-xs uppercase px-4 py-1 whitespace-nowrap tracking-widest">
            Latest
          </span>
          <div className="overflow-hidden flex-1">
            <div className="flex gap-12 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
              {[...topNews, ...topNews].map((n, i) => (
                <span key={i} className="text-white font-body text-xs">
                  ● {n.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── TOP 6 NEWS SECTION ───────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-primary font-body text-sm uppercase tracking-widest mb-1">Top Stories</p>
            <h2 className="section-title">Latest News</h2>
          </div>
          <Link to="/news" className="btn-outline text-sm px-4 py-2">View All</Link>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topNews.map(n => <NewsCard key={n._id} news={n} />)}
          </div>
        )}
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────── */}
      <section className="bg-surface border-y border-muted py-14">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-primary font-body text-sm uppercase tracking-widest mb-1">Browse by</p>
          <h2 className="section-title mb-8">Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat}
                to={`/news?category=${cat}`}
                className="border border-muted hover:border-primary hover:bg-primary/10 transition-all p-5 text-center group"
              >
                <div className="text-3xl mb-2">
                  {['🏛️','⚽','💻','🎬','💼','❤️'][i]}
                </div>
                <span className="font-body text-sm text-gray-300 group-hover:text-white">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXTRA CARDS ──────────────────────────────────────── */}
      {rest.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-14">
          <p className="text-primary font-body text-sm uppercase tracking-widest mb-1">Editor's Pick</p>
          <h2 className="section-title mb-8">More Stories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {rest.map(n => <NewsCard key={n._id} news={n} />)}
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-primary py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Share Your Story With The World
          </h2>
          <p className="font-body text-red-100 mb-8">
            Register and start publishing your own news articles to thousands of readers.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register" className="bg-white text-primary font-body font-bold px-8 py-3 hover:bg-light transition-colors">
              Get Started Free
            </Link>
            <Link to="/news" className="border border-white text-white font-body font-bold px-8 py-3 hover:bg-white/10 transition-colors">
              Browse News
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

export default Home
