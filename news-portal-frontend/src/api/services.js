// import API from './axios'

import axios_instance from './axios'


// ─── AUTH ────────────────────────────────────────────────
export const registerUser = async (data) =>
  await axios_instance.post('/auth/register', data)

export const loginUser = async (data) =>
  await axios_instance.post('/auth/login', data)


export const getMe = async () =>
  await axios_instance.get('/auth/me')

// ─── NEWS ────────────────────────────────────────────────
export const getTopNews = async () =>
  await axios_instance.get('/news/top')


export const getAllNews = async (params) =>
  await axios_instance.get('/news', { params })

export const getSingleNews = async (id) =>
  await axios_instance.get(`/news/${id}`)

export const getMyNews = async () =>
  await axios_instance.get('/news/my-news')


export const createNews = async (formData) =>
  await axios_instance.post('/news', formData)


export const updateNews = async (id, formData) =>
  await axios_instance.put(`/news/${id}`, formData)


export const deleteNews = async (id) =>
  await axios_instance.delete(`/news/${id}`)



// ─── USERS ───────────────────────────────────────────────
export const getUserProfile = async () =>
  await axios_instance.get('/users/profile')


export const updateUserProfile = async (formData) =>
  await axios_instance.put('/users/profile', formData)



// ─── CONTACT ─────────────────────────────────────────────
export const submitContact = async (data) =>
  await axios_instance.post('/contact', data)
