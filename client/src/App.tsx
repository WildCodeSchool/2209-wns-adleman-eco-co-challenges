import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomBootstrap.scss";
import { Route, Routes } from "react-router-dom";
import EventAddActions from "./pages/EventAddActions";
import Authentification from "./pages/Authentification";
import FriendDashboard from "./pages/Dashboard";
import UserFriendsList from "./pages/UserFriendsList";
import EventCreate from "./pages/EventCreate";
import Event from "./pages/Event";
import Events from "./pages/Events";
import Landing from "./pages/Landing";
import ProtectedRoute from "./components/GlobalComponents/ProtectedRoutes/ProtectedRoute";
import UserDashboard from "./pages/UserDashboard";
import UserFriendsAdd from "./pages/UserFriendsAdd";
import UserUpdate from "./pages/UserUpdate";
import TemplateForm from "./pages/TemplateForm";

function App() {
  return (
    <>
      <div>
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Authentification />} />
            <Route
              path="/friends"
              element={
                <ProtectedRoute>
                  <UserFriendsList />
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
                  <UserFriendsAdd />
                </ProtectedRoute>
              }
            />
            <Route
              path="/friends/add"
              element={
                <ProtectedRoute>
                  <UserFriendsAdd />
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
              path="/user/:id/update"
              element={
                <ProtectedRoute>
                  <UserUpdate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/event/create"
              element={
                <ProtectedRoute>
                  <EventCreate />
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
                  <EventAddActions />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
