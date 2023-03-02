import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomBootstrap.scss";
import { Route, Routes } from "react-router-dom";
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
          <Route path="/friends" element={<Friends />} />
          <Route path="/friend/:id" element={<User />} />
          <Route path="/friends/add" element={<Friends_add />} />
          <Route path="/home" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
