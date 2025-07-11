import FloatingShape from "./components/FloatingShape"
import {Routes, Route, Navigate} from 'react-router-dom'
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import EmailVerificationPage from "./pages/EmailVerificationPage"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authStore"
import { useEffect } from "react"
import Dashboard from "./pages/Dashboard"
import LoadingSpinner from "./components/LoadingSpinner"
// protected routes that require authentication
const ProtectedRoute = ({children}) => {
  const {isAuthenticated,user} = useAuthStore();

  if(!isAuthenticated || !user.isVerified){
    return <Navigate to="/login" replace />
  }
  if(!user.isVerified){
     return <Navigate to="/verify-email" replace />
  }
  return children;
}

// redirect authenticated user to the homepage
const RedirectAuthenticatedUser = ({children}) => {
  const {isAuthenticated, user} = useAuthStore();
  if(isAuthenticated && user.isVerified){
    return <Navigate to="/" replace />
  }
    return children;
}


function App() {
  const{ isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  },[checkAuth]);

  if(isCheckingAuth) return <LoadingSpinner />

  console.log("Is authenticated ", isAuthenticated);
  console.log("user ", user)
  return (
    <div className="min-h-screen bg-gradient-to-br 
    from-gray-900 via-green-900 to-emerald-900 
    flex items-center justify-center 
    relative overflow-hidden">
        <FloatingShape 
        color="bg-green-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay="0"
        />

          <FloatingShape 
        color="bg-green-500"
        size="w-48 h-48"
        top="-5%"
        left="10%"
        delay="0"
        />

          <FloatingShape 
        color="bg-green-500"
        size="w-32 h-32"
        top="-5%"
        left="10%"
        delay="0"
        />
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
              <Dashboard />
          </ProtectedRoute>
        }/>
        <Route path='/signup' element={
          <RedirectAuthenticatedUser>
              <SignUpPage/>
          </RedirectAuthenticatedUser>
        }/>
        <Route path='/login' element={
          <RedirectAuthenticatedUser>
              <LoginPage/>
          </RedirectAuthenticatedUser>
        }/>
        <Route path='/verify-email' element={<EmailVerificationPage/>}/>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
