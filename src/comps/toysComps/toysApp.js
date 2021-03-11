import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { URL_API } from "../services/apiSer";

import Header from "./Header";
import Login from "./login";
import Main from "./main";
import NavBar from "./navbar";
import UserList from "./userList";
import EditToyForm from "./editToyForm";

function ToysApp(props) {
  let [arr, setArr] = useState([]);
  useEffect(() => {
    doApi(URL_API + "/toys");
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
        <Header />
        <NavBar doApi={doApi} />
        <Switch>
          <Route exact path="/" render={() => <Main list={arr} />} />
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/userlist"
            render={() => <UserList setArr={setArr} />}
          />
          <Route exact path="/userlist/edit/:editId" component={EditToyForm} />
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default ToysApp;
