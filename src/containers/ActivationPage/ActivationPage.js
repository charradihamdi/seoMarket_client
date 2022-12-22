import React from "react";
import axios from "axios";
function ActivationPage(props) {
  const { activationcode } = props.match.params;
  const res = axios.post(
    `http://localhost:5000/api/auth/verifyuser/${activationcode}`
  );

  setTimeout((window.location = "/"), 50000);
  return <div>ActivationPage</div>;
}

export default ActivationPage;
