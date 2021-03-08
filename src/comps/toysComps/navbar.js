import React from "react";
import "../css/style.css";

function NavBar(props) {
  return (
    <nav className="container d-flex align-items-center row mx-auto">
      <div className="d-flex justify-content-between ">
        <div className="w-25 ">
          <select className="form-control">
            <option value="boys">Boys</option>
            <option value="girls">Girls</option>
            <option value="sport">Sport</option>
          </select>
        </div>
        <div className="w-25">
          <input
            placeholder="search here"
            className=" form-control"
            type="search"
          ></input>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
