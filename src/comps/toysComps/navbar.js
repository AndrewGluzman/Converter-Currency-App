import React from "react";
import { useRef, useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import { URL_API } from "../services/apiSer";
import Login from "./login";

function NavBar(props) {
  // היסטורי מאפשר ידנית דרך ג'אווה סקריפט
  // לשגר את עצמנו לעמוד אחר בלי לרפרש את הדפדפן
  let history = useHistory();
  let searchRef = useRef();
  let sortRef = useRef();
  let [show, setShow] = useState(null);

  let location = useLocation();

  const logOut = () => {
    localStorage.removeItem("tok");
    history.push("/");
    // addToast("You logged out from system",
    // {
    //   appearance: 'warning',
    //   autoDismiss: true
    // })
  };

  const showLogin = () => {
    !show ? setShow(true) : setShow(null);
  };

  const onSearchClick = () => {
    history.push("/");
    props.doApi(URL_API + `/toys/s/?q=${searchRef.current.value}`);
  };

  const onKeyboadClick = (e) => {
    if (e.code == "Enter") {
      onSearchClick();
    }
  };

  const onSelectSort = () => {
    sortRef.current.value
      ? props.doApi(URL_API + `/toys/cat/${sortRef.current.value}`)
      : props.doApi(URL_API + `/toys`);
  };

  return (
    <nav className="container bg-light">
      <div className="container p-3 ">
        {show && <Login showLogin={showLogin} />}
        <div className="row align-items-center">
          {location.pathname.includes("/userlist/") ? (
            <div></div>
          ) : (
            <div className="col-lg-12  form d-flex justify-content-between">
              <div className="mx-3 col-lg-1 text-start">
                <Link onClick={showLogin} to="#">
                  Log in
                </Link>
              </div>
              <div className="col-lg-6 d-flex justify-content-end">
                <div className=" col-lg-4 me-3">
                  <select
                    onChange={onSelectSort}
                    ref={sortRef}
                    className="form-select"
                  >
                    <option value="">Choose All</option>
                    <option value="sport">Sport</option>
                    <option value="boys">Boys</option>
                    <option value="girls">Girls</option>
                  </select>
                </div>
                <div className=" col-lg-6 d-flex">
                  <input
                    onKeyDown={onKeyboadClick}
                    tabIndex="0"
                    ref={searchRef}
                    className="form-control"
                    type="search"
                  />
                  <button onClick={onSearchClick} className="btn btn-info ms-2">
                    Search
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="nav col d-flex ">
            {location.pathname.includes("/userlist/") ? (
              <div className="justify-content-end">
                <div className="text-start">
                  <Link className="mx-2" to="#" onClick={logOut}>
                    Log out
                  </Link>
                  <Link to="/">Home</Link>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
