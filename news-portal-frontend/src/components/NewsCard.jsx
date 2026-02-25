import { Link } from 'react-router-dom'

const NewsCard = ({ news }) => {
  const date = new Date(news.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  })

  return (
    <div className="card group flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={news.image || `https://picsum.photos/seed/${news._id}/600/400`}
          alt={news.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="badge absolute top-3 left-3">{news.category}</span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-gray-500 font-body mb-3">
          <span>{date}</span>
          <span>·</span>
          <span>{news.views} views</span>
        </div>

        <h3 className="font-heading text-lg font-bold text-white leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {news.title}
        </h3>

        <p className="text-gray-400 font-body text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
          {news.summary}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            {news.author?.avatar ? (
              <img src={news.author.avatar} alt={news.author.name} className="w-7 h-7 rounded-full object-cover" />
            ) : (
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                {news.author?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-xs text-gray-400 font-body">{news.author?.name}</span>
          </div>

          <Link
            to={`/news/${news._id}`}
            className="text-primary text-sm font-semibold font-body hover:underline"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
