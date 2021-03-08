import React from "react";
import Header from "./Header";
import Main from "./main";
import NavBar from "./navbar";

function ToysApp(props) {
  return (
    <React.Fragment>
      <Header />;
      <NavBar />
      <Main />
    </React.Fragment>
  );
}

export default ToysApp;
