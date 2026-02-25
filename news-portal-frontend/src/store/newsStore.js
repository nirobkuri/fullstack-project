import { create } from "zustand"
import { getTopNews, getAllNews } from "../api/services"

const useNewsStore = create((set) => ({
  topNews: [],
  allNews: [],
  loading: false,
  error: null,
  page: 1,
  pages: 1,
  total: 0,

  // 🔥 TOP NEWS
  fetchTopNews: async () => {
    set({ loading: true, error: null })
    try {
      const res = await getTopNews()

      console.log("Top News Response 👉", res.data) // debug

      set({
        topNews: res.data.news || [], // ✅ ensure array
        loading: false,
      })
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      })
    }
  },

  // 📰 ALL NEWS WITH PAGINATION
  fetchAllNews: async (params = {}) => {
    set({ loading: true, error: null })
    try {
      const res = await getAllNews(params)

      console.log("All News Response 👉", res.data) // debug

      set({
        allNews: res.data.news || [],
        page: res.data.page || 1,
        pages: res.data.pages || 1,
        total: res.data.total || 0,
        loading: false,
      })
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      })
    }
  },
}))

export default useNewsStore