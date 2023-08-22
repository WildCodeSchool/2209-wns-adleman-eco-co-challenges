import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomBootstrap.scss";

import { Route, Routes } from "react-router-dom";

import Authentification from "./pages/Authentification";
import EmailPassword from "./components/GlobalComponents/EmailresetPassword/EmailPassword";
import Event from "./pages/Event";
import EventAddActions from "./pages/EventAddActions";
import EventCreate from "./pages/EventCreate";
import EventImageSelection from "./pages/EventImageSelection";
import Events from "./pages/Events";
import FriendDashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import PasswordReset from "./components/GlobalComponents/PasswordReset/PasswordReset";
import ProtectedRoute from "./components/GlobalComponents/ProtectedRoutes/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import UserDashboard from "./pages/UserDashboard";
import UserFriendsAdd from "./pages/UserFriendsAdd";
import UserFriendsList from "./pages/UserFriendsList";
import UserImageAdd from "./pages/UserImageAdd";
import UserUpdate from "./pages/UserUpdate";

function App() {
  return (
    <>
      <div>
      <Toaster position="top-center" />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Authentification />} />
            <Route path="/password/reset/:id/:token" element={<PasswordReset/>}/>
            <Route path="/password/email" element={<EmailPassword/>}/>
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
                  path="/user/:id/selectimage"
                  element={
                      <ProtectedRoute>
                          <UserImageAdd />
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
                path="/event/image/add/:id"
                element={
                    <ProtectedRoute>
                        <EventImageSelection  />
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
