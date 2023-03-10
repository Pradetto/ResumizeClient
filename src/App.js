import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "scenes/layout";
import Home from "scenes/home";
import Resumize from "scenes/resumize";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/resumize" element={<Resumize />} />
          <Route path="/jobs" element={<Home />} />
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
