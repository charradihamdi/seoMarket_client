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
const Forget = () => {
  const [email, setEmail] = useState("");

  const userLogin = () => {
    //dispatch(Forget({ email }));
  };
  return (
    <div>
      {""}
      <div
        className="authContainer"
        style={{ border: " 1px solid #2874F0", marginTop: "10vh" }}
      >
        <div className="row">
          <div className="leftspace">
            <p>
              <h3>Find Your Account</h3>
              Please enter your email address or mobile number to search for
              your account.
            </p>
          </div>
          <div className="rightspace">
            <div className="loginInputContainer">
              <MaterialInput
                type="text"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <MaterialButton
                title={"Submit"}
                bgColor="#fb641b"
                textColor="#ffffff"
                style={{
                  margin: "40px 0 20px 0",
                }}
                onClick={userLogin}
              />
              <Link to="/" style={{ fontSize: "12px" }}>
                <p>home</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forget;
