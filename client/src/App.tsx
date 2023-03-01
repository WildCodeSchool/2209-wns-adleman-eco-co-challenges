import "./App.css";

import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomBootstrap.scss";

import Authentification from "./pages/Authentification";
import Friends from "./pages/Friends_list";
import User from "./pages/User";
import Friends_add from "./pages/Friends_add";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";

function App() {
  return (
    <div>
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Authentification />} />
          <Route path="/friend" element={<Friends />} />
          <Route path="/friend/:id" element={<User />} />
          <Route path="/friend/add" element={<Friends_add />} />
          <Route path="/home/:nickName" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
