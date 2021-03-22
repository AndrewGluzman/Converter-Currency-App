import React from "react";
import { useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import "../css/style.css";
import { URL_API } from "../services/apiSer";

function NavBar(props) {
  // היסטורי מאפשר ידנית דרך ג'אווה סקריפט
  // לשגר את עצמנו לעמוד אחר בלי לרפרש את הדפדפן
  let history = useHistory();
  let searchRef = useRef();
  let sortRef = useRef();

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
        <div className="row align-items-center">
          <div className="col-lg-6 row form">
            <div className="d-flex col-lg-6">
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
            <div className=" col-lg-6">
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
          </div>
          <div className="nav col-lg-6 d-flex justify-content-end">
            {location.pathname.includes("/userlist/") ? (
              <div className="col  text-end">
                <Link className="mx-2" to="#" onClick={logOut}>
                  Log out
                </Link>
                <Link to="/">Home</Link>
              </div>
            ) : (
              <div className="col mx-3 text-end">
                <Link to="/login">Log in</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
