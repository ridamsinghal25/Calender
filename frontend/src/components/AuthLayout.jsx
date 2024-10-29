import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function AuthLayout({ children, authentication = true }) {
  const [loader, setLoader] = useState(true);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication && Boolean(token) !== authentication) {
      navigate("/sign-in");
    } else if (!authentication && Boolean(token) !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [token, navigate, authentication]);

  return loader ? <Loader /> : <>{children}</>;
}

export default AuthLayout;
