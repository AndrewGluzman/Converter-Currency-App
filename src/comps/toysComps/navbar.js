import React from "react";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import "../css/style.css";

function NavBar(props) {
  // היסטורי מאפשר ידנית דרך ג'אווה סקריפט
  // לשגר את עצמנו לעמוד אחר בלי לרפרש את הדפדפן
  let history = useHistory();
  let searchRef = useRef();
  let sortRef = useRef();

  const onSearchClick = () => {
    history.push("/");
    props.doApi(
      `https://toys4sale.herokuapp.com/toys/s/?q=${searchRef.current.value}`
    );
  };

  const onKeyboadClick = (e) => {
    if (e.code == "Enter") {
      onSearchClick();
    }
  };

  const onSelectSort = () => {
    sortRef.current.value
      ? props.doApi(
          `https://toys4sale.herokuapp.com/toys/cat/${sortRef.current.value}`
        )
      : props.doApi(`https://toys4sale.herokuapp.com/toys`);
  };
  return (
    <nav className="container bg-warning">
      <div className="container p-3 ">
        <div className="row align-items-center">
          <div className="col-lg-6 row form">
            <div className="d-flex col-6">
              <input
                onKeyDown={onKeyboadClick}
                tabIndex="0"
                ref={searchRef}
                className="form-control"
                type="search"
              />
              <button onClick={onSearchClick} className="btn btn-info">
                Search
              </button>
            </div>
            <div className=" col-6">
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
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
