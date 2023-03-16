import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "scenes/layout";
import Home from "scenes/home";
import Resumize from "scenes/resumize";
import About from "scenes/about";
import Logout from "scenes/about/logout";
import Register from "scenes/register";
import Login from "scenes/login";
import ForgotPassword from "scenes/forgotPassword";
import ResetPassword from "scenes/resetPassword";
import { useIsAuthenticatedQuery } from "state/authApi";
import Profile from "scenes/profile";

function App() {
  const { data: isAuthenticated, isLoading, error } = useIsAuthenticatedQuery();
  console.log("here is your auth status", isAuthenticated);
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
          <Route
            path="/files"
            element={isAuthenticated ? <Resumize /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/*" element={<ResetPassword />} />
          <Route path="/*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

/* <Route path="/resumes" element={<Home />} />
<Route path="/coverletters" element={<Home />} /> */
