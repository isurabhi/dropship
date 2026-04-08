import { Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import CustomerListPage from './pages/CustomerListPage'
import NewCustomerPage from './pages/NewCustomerPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/customers" element={<CustomerListPage />} />
      <Route path="/customers/new" element={<NewCustomerPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
