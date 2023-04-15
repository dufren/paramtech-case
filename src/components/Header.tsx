import "../styles/componentStyles/_header.scss";
import React from "react";
import { useAppSelector } from "../app/hooks";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

export default function Header() {
  const fullName = useAppSelector((store) => store.login.userInfo);

  return (
    <div className="navbar">
      <Link to={"/packages"}>PARAMTECH</Link>
      <h3>
        <UserOutlined className="site-form-item-icon navbar__icon" />
        {fullName.fullName}
      </h3>
    </div>
  );
}
