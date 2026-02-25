import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),

  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    set({ user })
  },

  logout: () => {
    localStorage.removeItem('user')
    set({ user: null })
  },

  updateUser: (updatedUser) => {
    const merged = { ...JSON.parse(localStorage.getItem('user') || '{}'), ...updatedUser }
    localStorage.setItem('user', JSON.stringify(merged))
    set({ user: merged })
  },
}))

export default useAuthStore
