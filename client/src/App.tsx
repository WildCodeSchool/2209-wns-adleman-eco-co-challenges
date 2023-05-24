import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomBootstrap.scss";

import { Route, Routes } from "react-router-dom";

import Authentification from "./pages/Authentification";
import FriendDashboard from "./pages/Dashboard";
import Friends from "./pages/FriendsList";
import Landing from "./pages/Landing";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import UserDashboard from "./pages/User";
import FriendsAdd from "./pages/FriendsAdd";

function App() {
  return (
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
                  <FriendsAdd />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/:id"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
  );
}

export default App;
