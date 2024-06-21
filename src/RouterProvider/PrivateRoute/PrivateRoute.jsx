import { Navigate, useLocation } from "react-router";
import useAuth from "../../Hooks/UseAuth/UseAuth";



const PrivateRoute = ({ children }) => {
    const { user, loader } = useAuth();
    const location = useLocation();

    if (loader) {
        return <div className="text-center">
            <span className="loading loading-dots loading-md"></span>
            <span className="loading loading-dots loading-lg"></span>
        </div>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;