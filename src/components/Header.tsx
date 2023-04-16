import "../styles/componentStyles/_header.scss";
import React from "react";
import { useAppSelector } from "../app/hooks";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import logo from "../assets/logo.svg";

export default function Header() {
  const fullName = useAppSelector((store) => store.login.userInfo);

  return (
    <nav className="navbar">
      <Link to={"/packages"}>
        <img src={logo} alt="logo" />
      </Link>
      <h3>
        <UserOutlined className="site-form-item-icon navbar__icon" />
        {fullName.fullName}
      </h3>
    </nav>
  );
}
