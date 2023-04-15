import "../styles/_header.scss";

import React from "react";
import { useAppSelector } from "../app/hooks";
import { Link } from "react-router-dom";

export default function Header() {
  const fullName = useAppSelector((store) => store.login.userInfo);

  return (
    <div className="navbar">
      <Link to={"/packages"}>PARAMTECH</Link>
      <h3>{fullName.fullName}</h3>
    </div>
  );
}
