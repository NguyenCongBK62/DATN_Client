import RouteApp from "./RouteApp";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { setIsLoginStatus } from "Store/modules/Auth";
import { logout } from "helper/AuthHelper";

export default function App() {
  const token = localStorage.getItem("Authorization");
  const dispatch = useDispatch();
  useEffect(() => {
    if (token !== null) {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        logout();
        dispatch(setIsLoginStatus(false));
      }
      dispatch(setIsLoginStatus(true));
    } else {
      dispatch(setIsLoginStatus(false));
    }
  }, []);
  return <RouteApp />;
}
