import "./App.css";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Authentification from "./pages/Authentification";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <div className="container">
      <Header />
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
