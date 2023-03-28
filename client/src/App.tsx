import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomBootstrap.scss";

import { Route, Routes } from "react-router-dom";

import Authentification from "./pages/Authentification";
import FriendDashboard from "./pages/Dashboard";
import Friends from "./pages/Friends_list";
import Friends_add from "./pages/Friends_add";
import Landing from "./pages/Landing";
import UserDashboard from "./pages/User";

function App() {
  return (
    <div>
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Authentification />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/friend/:id" element={<FriendDashboard />} />
          <Route path="/friends/add" element={<Friends_add />} />
          <Route path="/home/:id" element={<UserDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
