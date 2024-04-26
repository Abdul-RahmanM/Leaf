import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import EventPage from "./pages/EventPage"
import EventType from "./pages/EventType"
import Explore from "./pages/Explore"
import Create from "./pages/Create"
import ProtectedRoute from "./components/ProtectedRoute"


function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>

          }
        />
        <Route
          path="/eventPage"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />
        <Route
          path="/yourEvents"
          element={
            <ProtectedRoute>
              <EventPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/eventType"
          element={
            <ProtectedRoute>
              <EventType />
            </ProtectedRoute>
          }
        />
        <Route
          path="/eventCreate"
          element={
            <ProtectedRoute>
              <Create />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App