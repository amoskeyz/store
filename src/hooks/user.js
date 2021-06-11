import { useEffect, useState } from "react";
import { axiosInstance, parseJwt } from "../helpers";
import { useLocation } from "react-router";
import Cookies from "js-cookie";

export default function User() {
  const [user, setuser] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      let user;

      const ctoken = Cookies.get("agcola");
      if (ctoken) {
        const _user = parseJwt(ctoken);
        user = { ..._user.user, iat: _user.iat };
      }

      setuser(user);
      setIsAdmin(user && user.role === "admin");
    })();
    return () => {};
  }, [location.pathname]);

  const logout = async () => {
    return await axiosInstance.get("/logout");
  };

  return { logout, user, isAdmin };
}
