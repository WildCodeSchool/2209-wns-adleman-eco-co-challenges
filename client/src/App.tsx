import "./App.css";

import { Route, Routes } from "react-router-dom";

import Authentification from "./pages/Authentification";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";


function App() {
  return (
    <div>
        <main>
          <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/login" element={<Authentification />} />
            <Route path="/users" element={<Users />} />
            <Route path="/home" element={<Dashboard />} />
          </Routes>
        </main>
    </div>
  );
}

export default App;
