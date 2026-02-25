import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './routes/PrivateRoute'

import Home       from './pages/Home'
import News       from './pages/News'
import SingleNews from './pages/SingleNews'
import Login      from './pages/Login'
import Register   from './pages/Register'
import Dashboard  from './pages/Dashboard'
import EditNews   from './pages/EditNews'
import Contact    from './pages/Contact'
import NotFound   from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#161616',
            color: '#F5F0EB',
            border: '1px solid #2A2A2A',
            fontFamily: 'DM Sans, sans-serif',
          },
          success: { iconTheme: { primary: '#C1121F', secondary: '#fff' } },
        }}
      />
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/news"        element={<News />} />
          <Route path="/news/:id"    element={<SingleNews />} />
          <Route path="/login"       element={<Login />} />
          <Route path="/register"    element={<Register />} />
          <Route path="/contact"     element={<Contact />} />
          <Route path="/dashboard"   element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/dashboard/edit/:id" element={<PrivateRoute><EditNews /></PrivateRoute>} />
          <Route path="*"            element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
