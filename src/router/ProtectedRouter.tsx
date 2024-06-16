import React, { useEffect } from "react";
import { COMMON } from "../constants/common";
import { authSelector } from "../redux/slices/authSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { getMe } from "../redux/actions/auth.action";
import Admin from "../pages/Admin";
import { DefaultLayout } from "../components";
interface ProtectedRouterProps {
  role?: COMMON.ADMIN | COMMON.USER;
}

const ProtectedRouter: React.FC<ProtectedRouterProps> = ({ role }) => {
  const { isAuthenticated, user } = useSelector(authSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(getMe()).then((res) => {
        if (res.type.endsWith("rejected")) {
          navigate("/login");
        }
        if (role && res.payload.role === "USER") {
          return <> not admin</>;
        }
      });
    }
  }, []);
  if (isAuthenticated) {
    if (role && user?.roleId === "USER") {
      return <> not admin</>;
    }
    return role === COMMON.ADMIN ? <Admin /> : <DefaultLayout />;
  }
  // return <>Loading</>;
};

export default ProtectedRouter;
