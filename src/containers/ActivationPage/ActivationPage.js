import React from "react";
import axios from "axios";
function ActivationPage(props) {
  const { activationcode } = props.match.activationcode;
  axios.post(`http://localhost:5000/api/auth/verifyuser/${activationcode}`);
  console.log(props);
  return <div>ActivationPage</div>;
}

export default ActivationPage;
