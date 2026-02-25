import { Navigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

const PrivateRoute = ({ children }) => {
  const { user } = useAuthStore()
  return user ? children : <Navigate to="/login" replace />
}

export default PrivateRoute
