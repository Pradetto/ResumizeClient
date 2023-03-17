import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "state/authApi";

const useLogout = () => {
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();

  const logoutHandler = async () => {
    try {
      await logoutUser();
      navigate("/home");
      window.location.reload();
    } catch (err) {
      console.error("Error logging out", err);
    }
  };

  return logoutHandler;
};

export default useLogout;