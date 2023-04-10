import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "scenes/layout";
import Home from "scenes/home";
import Resumize from "scenes/resumize";
import About from "scenes/about";
import Register from "scenes/register";
import Login from "scenes/login";
import ForgotPassword from "scenes/forgotPassword";
import ResetPassword from "scenes/resetPassword";
import { useIsAuthenticatedQuery } from "state/authApi";
import UserProfile from "scenes/userProfile";
import Files from "scenes/files";

function App() {
  const { data: isAuthenticated } = useIsAuthenticatedQuery();
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/resumize"
            element={isAuthenticated ? <Resumize /> : <Navigate to="/login" />}
          />
          <Route path="/files" element={<Files />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

/* <Route path="/resumes" element={<Home />} />
<Route path="/coverletters" element={<Home />} /> */
