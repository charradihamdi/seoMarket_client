import React, { useEffect, useState } from "react";
import "./style.css";
import goldenStar from "../../images/logo/golden-star.png";
import { IoIosArrowDown, IoIosCart, IoIosSearch } from "react-icons/io";
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu,
  MaterialSelect,
} from "../MaterialUI";
import { useDispatch, useSelector } from "react-redux";
import { login, signout, getCartItems, signup as _signup } from "../../actions";
import Cart from "../UI/Cart";
import { NavLink, Link, Redirect } from "react-router-dom";
import { profilePicture } from "./consPicture";
import logo from "./teamwork.jpg";
/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const [loginModal, setLoginModal] = useState(false);
  const [signup, setSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [statut, setStatut] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [sexe, setSexe] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validateForum, setValidateForum] = useState(false);
  const [error, setError] = useState("");
  const [sexeList, setSexeList] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // state cart value
  const cart = useSelector((state) => state.cart);

  const userSignup = () => {
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    if (confirmPassword != password) {
      alert("confirm password incorrect");
    }
    if (!validateForum) {
      alert("accept the general rule ");
    }
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword != password ||
      validateForum == false
    ) {
      return;
    } else {
      dispatch(_signup(user));
      setLoginModal(false);
    }
  };

  const userLogin = () => {
    if (signup) {
      userSignup();
    } else {
      dispatch(login({ email, password })).then(() => {
        setLoginModal(false);
      });
    }
  };

  const logout = () => {
    dispatch(signout());
  };

  useEffect(() => {
    if (auth.authenticate) {
      setLoginModal(false);
    }
    if (auth.authenticate) {
      return <Redirect to={`/`} />;
    }
  }, [auth.authenticate]);

  const renderLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <div className="pseudo">
            <img
              src={profilePicture}
              alt=""
              className="m-3"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "2px solid #2586E5",
              }}
            />{" "}
          </div>
        }
        menus={[
          { label: "My Profile", href: "/profil", icon: null },
          { label: "create website", href: "/website", icon: null },
          {
            label: "Logout",
            href: "/",
            icon: null,
            onClick: logout,
            className: "logoutMenu",
          },
        ]}
      />
    );
  };

  const renderNonLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <a
            onClick={() => {
              setSignup(false);
              setLoginModal(true);
            }}
          >
            <div className="loginButton">Login</div>
          </a>
        }
        firstMenu={
          <div className="firstmenu" style={{ backgroundColor: "white" }}>
            <span>New Customer?</span>
            <a
              onClick={() => {
                setLoginModal(true);
                setSignup(true);
              }}
            >
              <span className="signupmenu btn bg-danger">Sign Up</span>
            </a>
          </div>
        }
      />
    );
  };

  return (
    <>
      <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className="authContainer">
          <div className="rowModal">
            <div className="leftspace">
              {signup ? (
                <h2 style={{ color: "white" }}>Sign up</h2>
              ) : (
                <h2 style={{ color: "white" }}>Login</h2>
              )}
              <p>Get access to websites, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">
              <div className="loginInputContainer">
                {auth.error && (
                  <div style={{ color: "red", fontSize: 12 }}>{auth.error}</div>
                )}
                {signup && (
                  <MaterialInput
                    type="text"
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                )}
                {signup && (
                  <MaterialInput
                    type="text"
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                )}

                <MaterialInput
                  type="text"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {signup && (
                  <MaterialInput
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                    // rightElement={<a href="#">Forgot?</a>}
                  />
                )}
                {!signup && (
                  <MaterialInput
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    rightElement={<a href="/forget">Forgot?</a>}
                    // rightElement={<a href="#">Forgot?</a>}
                  />
                )}

                {signup && (
                  <MaterialInput
                    type="password"
                    label="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                )}
                {signup && (
                  <>
                    <input
                      style={{ marginTop: "15px" }}
                      type="checkbox"
                      value={validateForum}
                      onChange={(e) => setValidateForum(!validateForum)}
                    />
                    validate forum
                  </>
                )}
                <MaterialButton
                  title={signup ? "Register" : "Login"}
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  style={{
                    margin: "40px 0 20px 0",
                  }}
                  onClick={userLogin}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div
        class="header header-transparent dark-text"
        style={{ background: "white" }}
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <nav
                id="navigation"
                class="navigationn navigation-landscape"
                style={{ border: "0px solid black" }}
              >
                <div class="nav-header">
                  <a class="nav-brand" href="/">
                    <img
                      src={logo}
                      class="logo"
                      alt=""
                      style={{
                        width: "80px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  </a>
                  <div class="nav-toggle"></div>
                </div>
                <div class="nav-menus-wrapper">
                  <ul class="nav-menu">
                    <li class="active">
                      <a href="/">
                        Home<span class="submenu-indicator"></span>
                      </a>
                      <a href="/websites">
                        websites<span class="submenu-indicator"></span>
                      </a>
                    </li>
                    {auth.user.authenticate ? (
                      <li>
                        <a href="/profil">Dashboard</a>
                      </li>
                    ) : null}
                  </ul>

                  <ul class="nav-menu nav-menu-social align-to-right">
                    <li
                      className={
                        !auth.authenticate && !auth.user.isActive
                          ? "add-listing dark-bg"
                          : "logoprofile"
                      }
                    >
                      {auth.authenticate && auth.user.isActive
                        ? renderLoggedInMenu()
                        : renderNonLoggedInMenu()}
                      <DropdownMenu />
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
