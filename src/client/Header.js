import React, { Component } from "react";
import logo from "./assets/ptit-logo.png";
import { NavLink } from "react-router-dom";
const Menu = () => (
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <NavLink
        style={{ color: "black", fontWeight: "bold", fontSize:"18px" }}
        className="nav-item nav-link"
        exact
        to="/"
        activeStyle={{
          fontWeight: "bold",
          color: "red",
          textDecoration: "underline"
        }}
      >
        Nhập liệu{" "}
      </NavLink>
      <NavLink
        style={{ color: "black", fontWeight: "bold", fontSize:"18px" }}
        className="nav-item nav-link"
        to="/thongke"
        activeStyle={{
          fontWeight: "bold",
          color: "red",
          textDecoration: "underline"
        }}
      >
        Thống kê
      </NavLink>
      <NavLink
        style={{ color: "black", fontWeight: "bold", fontSize:"18px" }}
        className="nav-item nav-link"
        to="/emailManager"
        activeStyle={{
          fontWeight: "bold",
          color: "red",
          textDecoration: "underline"
        }}
      >
        Gửi Email
      </NavLink>
    </div>
  </div>
);
class Header extends Component {
  render() {
    return (
      <div>
        <nav
          className="navbar navbar-expand-lg bg-light"
          fill="true"
          variant="tabs"
        >
          <a className="navbar-brand" href="#">
            <img src={logo} width="120" height="60" />
          </a>

          <Menu />
        </nav>
        <hr style={{ color: "#f00", backgroundColor: "#f00", height: "2px", marginTop:'0px' }} />
        <hr className="fancy-line"/>
      </div>
    );
  }
}

export default Header;
