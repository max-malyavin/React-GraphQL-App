import React, { useContext } from "react";
import { Button, Layout } from "antd";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth";
const { Header: HeaderAntd } = Layout;

const Header = () => {
  const { user, logout } = useContext(AuthContext);

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

      {user ? (
        <Button onClick={logout}>Выйти</Button>
      ) : (
        <>
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
        </>
      )}
    </HeaderAntd>
  );
};

export default Header;
