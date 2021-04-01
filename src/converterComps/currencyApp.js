import React, { useState } from "react";
import Converter from "./converter";
import "../converterComps/css/style.css";
import DisplayCurrency from "./displayCurrency";

function CurrencyApp(props) {
  let [dispayCur, setDisplayCure] = useState();
  let [sign, setSign] = useState("");
  let [time, setTime] = useState("");

  return (
    <div className="text-center">
      <header className="d-flex align-items-center">
        <h1 className="mx-auto text-light display-2">
          Simple currency converter
        </h1>
      </header>
      <Converter
        setSign={setSign}
        setDisplay={setDisplayCure}
        setTime={setTime}
      />
      <DisplayCurrency sign={sign} dispayCur={dispayCur} time={time} />
    </div>
  );
}

export default CurrencyApp;
