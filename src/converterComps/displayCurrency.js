import { useEffect } from "react";
import React from "react";

function DisplayCurrency(props) {
  useEffect(() => {}, [props]);

  let dateNow = Date.now();

  return (
    <main>
      <h1 className="display-1 mt-5">
        {props.dispayCur}{" "}
        <span>{props.sign.substr(3, props.sign.length - 1)}</span>
      </h1>
      <div className=" mt-5 p-5 bg-dark text-light">
        <p>{new Date(dateNow - props.time).toDateString()}</p>
        <p>Created by Henry Gluzman</p>
      </div>
    </main>
  );
}

export default DisplayCurrency;
