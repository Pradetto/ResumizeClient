import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "scenes/layout";
import Home from "scenes/home";
import Resumize from "scenes/resumize";
import About from "scenes/about";
import Logout from "scenes/about/logout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resumize" element={<Resumize />} />
          <Route path="/files" element={<Logout />} />
          <Route path="/resumes" element={<Home />} />
          <Route path="/coverletters" element={<Home />} />
          <Route path="/settings" element={<Home />} />
          <Route path="/*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
