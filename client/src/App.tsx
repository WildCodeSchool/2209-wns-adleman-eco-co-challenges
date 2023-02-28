import "./App.css";

import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomBootstrap.scss";

import Authentification from "./pages/Authentification";
import Users from "./pages/Users";
import User from "./pages/User";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";

function App() {
  return (
    <div>
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Authentification />} />
          <Route path="/friend" element={<Users />} />
          <Route path="/friend/:id" element={<User />} />
          <Route path="/home/:nickName" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
