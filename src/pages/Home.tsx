import "../styles/pageStyles/_home.scss";

import React, { useEffect } from "react";

import LoginForm from "../components/LoginForm";

import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export default function Home() {
  const navigate = useNavigate();
  const user = useAppSelector((store) => store.login.isLoggedIn);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/packages");
      });
    }
  }, [user, navigate]);

  return (
    <div>
      <LoginForm />
    </div>
  );
}
