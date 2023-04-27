import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomBootstrap.scss";

import { Route, Routes } from "react-router-dom";

import Authentification from "./pages/Authentification";
import FriendDashboard from "./pages/Dashboard";
import Friends from "./pages/Friends_list";
import Friends_add from "./pages/Friends_add";
import Landing from "./pages/Landing";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import UserContextProvider from "./components/AuthContext/AuthContext";
import UserDashboard from "./pages/User";

function App() {
  return (
    <UserContextProvider>
      <div>
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Authentification />} />
            <Route
              path="/friends"
              element={
                <ProtectedRoute>
                  <Friends />
                </ProtectedRoute>
              }
            />
            <Route
              path="/friend/:id"
              element={
                <ProtectedRoute>
                  <FriendDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/friends/add"
              element={
                <ProtectedRoute>
                  <Friends_add />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home/:id"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </UserContextProvider>
  );
}

export default App;
