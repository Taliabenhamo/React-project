import { ReactNode, useContext } from "react";
import { getToken } from "./TokenManager";
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
interface AuthRouteProps {
  children: React.ReactNode;
}


export const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const userToken = getToken();
  const { userData } = useContext(UserContext);

  if (!userToken||(userToken && !userData?.user?.isAdmin)) {
    
    return (
      <div className="error-container text-center mt-5 p-5 vh-100">
        <h1 className="error-heading">
          Error <GppMaybeIcon fontSize="inherit" />
        </h1>
        <div className="unauthorized-text">
          <h2>Unauthorized</h2>
          <p>
            You are not authorized to access this page.
            <br />
            Please <Link to="/login">login</Link> to continue.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

