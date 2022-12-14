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
      sexe,
      contactNumber,
      country,
      statut,
    };
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      sexe === "" ||
      country === "" ||
      contactNumber === "" ||
      statut === ""
    ) {
      return;
    }

    dispatch(_signup(user));
  };

  const userLogin = () => {
    if (signup) {
      userSignup();
    } else {
      dispatch(login({ email, password }));
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
          <Link to="/profil" className="fullName">
            <img
              src={profilePicture}
              alt=""
              className="m-2"
              style={{ width: "30px", height: "30px", borderRadius: "18%" }}
            />
          </Link>
        }
        menus={[
          { label: "My Profile", href: "/profil", icon: null },
          { label: "websites", href: "/website", icon: null },
          { label: "Logout", href: "", icon: null, onClick: logout },
        ]}
      />
    );
  };

  const renderNonLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <a
            className="loginButton"
            onClick={() => {
              setSignup(false);
              setLoginModal(true);
            }}
          >
            Login
          </a>
        }
        firstMenu={
          <div className="firstmenu">
            <span>New Customer?</span>
            <a
              onClick={() => {
                setLoginModal(true);
                setSignup(true);
              }}
              style={{ color: "#2874f0" }}
            >
              Sign Up
            </a>
          </div>
        }
      />
    );
  };

  return (
    <div className="header">
      <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              {signup ? <h2>Sign up</h2> : <h2>Login</h2>}
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
                <MaterialInput
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // rightElement={<a href="#">Forgot?</a>}
                />
                {signup && (
                  <MaterialInput
                    type="number"
                    label="contactNumber"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                )}
                {signup && (
                  <MaterialInput
                    type="text"
                    label="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                )}
                <br />
                {signup && (
                  <>
                    <select
                      style={{ width: "100%", border: "1px solid white" }}
                      className="form-select"
                      type="select "
                      label="sexe"
                      placeholder="sexe"
                      value={sexe}
                      onChange={(e) => setSexe(e.target.value)}
                    >
                      <option value="--Please choose an option--">
                        --Please choose an option--
                      </option>
                      <option value="male">male</option>
                      <option value="female">female</option>
                      <option value="other">other</option>
                    </select>
                  </>
                )}

                {signup && (
                  <>
                    <select
                      style={{
                        width: "100%",
                        border: "1px solid white",
                        marginTop: "20px",
                      }}
                      className="form-select mt-5"
                      type="select "
                      label="status"
                      placeholder="status"
                      value={statut}
                      onChange={(e) => setStatut(e.target.value)}
                    >
                      <option value="--Please choose an option--">
                        --Please choose an option--
                      </option>

                      <option value="bloggeur">bloggeur</option>
                      <option value="company">company</option>
                      <option value="agency">agency</option>
                      <option value="site owner">site owner</option>
                    </select>
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
      <div className="subHeader">
        {/* Logo  */}
        <div className="logo">
          <a href="">
            <img src={""} className="logoimage" alt="" />
          </a>
          <a style={{ marginTop: "-10px" }}>
            <span className="exploreText">Explore</span>
            <span className="plusText">Plus</span>
          </a>
        </div>
        {/* logo ends here */}

        {/* search component */}
        <div
          style={{
            padding: "0 10px",
          }}
        >
          <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={"search for websites, brands and more"}
            />
            <div className="searchIconContainer">
              <IoIosSearch
                style={{
                  color: "#2874f0",
                }}
              />
            </div>
          </div>
        </div>
        {/* search component ends here */}

        {/* right side menu */}
        <div className="rightMenu">
          {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}
          <DropdownMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
