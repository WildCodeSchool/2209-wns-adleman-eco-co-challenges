import "./App.css";

import { Route, Routes } from "react-router-dom";

import Authentification from "./pages/Authentification";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";


function App() {
  return (
    <div>
        <main>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Authentification />} />
            <Route path="/users" element={<Users />} />
            <Route path="/home" element={<Dashboard />} />
          </Routes>
        </main>
    </div>
  );
}

export default App;
