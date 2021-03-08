import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Header";
import Main from "./main";
import NavBar from "./navbar";

function ToysApp(props) {
  let [arr, setArr] = useState([]);
  useEffect(() => {
    doApi("https://toys4sale.herokuapp.com/toys");
  }, []);
  const doApi = async (_url) => {
    let resp = await fetch(_url);
    let data = await resp.json();
    console.log(data);
    setArr(data);
  };
  return (
    <Router>
      <React.Fragment>
        <Header />;
        <NavBar doApi={doApi} />
        <Switch>
          <Route exact path="/" render={() => <Main list={arr} />} />
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default ToysApp;
