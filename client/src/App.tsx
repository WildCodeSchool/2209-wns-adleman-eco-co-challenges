import "./App.css";

import { Link, Route, Routes } from "react-router-dom";

import Authentification from "./pages/authentification";
import Users from "./pages/Users";

function App() {
  return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Connection with back</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Authentification />} />
          <Route path="/users" element={<Users />} />
        </Routes>
        </div>
  );
}

export default App;
