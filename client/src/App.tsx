import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomBootstrap.scss";
import { Route, Routes } from "react-router-dom";
import AddActionsToEvent from "./pages/AddActionstoEvent";
import Authentification from "./pages/Authentification";
import CreateEvent from "./pages/CreateEvent";
import Event from "./pages/Event";
import Events from "./pages/Events";
import Friends from "./pages/FriendsList";
import FriendsAdd from "./pages/FriendsAdd";
import Landing from "./pages/Landing";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import UserDashboard from "./pages/User";

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
          <Route
            path="/event/create"
            element={
              <ProtectedRoute>
                <CreateEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/event/:id"
            element={
              <ProtectedRoute>
                <Event />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            }
          />
          <Route
            path="/actions/add/:id"
            element={
              <ProtectedRoute>
                <AddActionsToEvent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
