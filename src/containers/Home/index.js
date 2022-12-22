import React from "react";
import Layout from "../../components/Layout";
import { Jumbotron, Row, Col, Container } from "react-bootstrap";
import "./style.css";
import { NavLink } from "react-router-dom";

/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  return (
    <Layout sidebar>
      <Jumbotron
        style={{ margin: "5rem", background: "#fff" }}
        className="text-center"
      >
        <h1>Welcome to Admin Dashboard</h1>
        <p>manage categories </p>
        <p>manage users </p>
        <p>manage websites </p>
      </Jumbotron>
    </Layout>
  );
};

export default Home;
