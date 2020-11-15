import React from "react";
import { Layout } from "antd";
import { NavLink } from "react-router-dom";
const { Header: HeaderAntd } = Layout;

const Header = () => {
  return (
    <HeaderAntd className="header">
      <NavLink
        style={{ flex: "auto" }}
        exact
        to="/"
        activeStyle={{
          fontWeight: "bold",
          color: "black",
        }}
      >
        Главная
      </NavLink>
      <NavLink
        style={{ marginRight: "20px" }}
        activeStyle={{
          fontWeight: "bold",
          color: "black",
        }}
        to="/register"
      >
        Регистрация
      </NavLink>
      <NavLink
        activeStyle={{
          fontWeight: "bold",
          color: "black",
        }}
        to="/login"
      >
        Логин
      </NavLink>
    </HeaderAntd>
  );
};

export default Header;
