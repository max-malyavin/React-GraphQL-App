import React, { useContext } from "react";
import { Button, Layout } from "antd";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth";
const { Header: HeaderAntd } = Layout;

const styleLink = {
  padding: "0 5px 0 5px",
  backgroundColor: "#44c767",
  fontSize: "17px",
  borderRadius: "10px",
  border: "1px solid #18ab29",
  color: "#ffffff",
  textShadow: "0px 1px 0px #2f6627",
};

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <HeaderAntd className="header">
      <NavLink
        style={{
          margin: "0 auto 0 0",
        }}
        exact
        to="/"
        activeStyle={styleLink}
      >
        Главная
      </NavLink>

      {user ? (
        <Button onClick={logout}>Выйти</Button>
      ) : (
        <>
          <NavLink
            style={{ marginRight: "20px" }}
            activeStyle={styleLink}
            to="/register"
          >
            Регистрация
          </NavLink>
          <NavLink activeStyle={styleLink} to="/login">
            Логин
          </NavLink>
        </>
      )}
    </HeaderAntd>
  );
};

export default Header;
