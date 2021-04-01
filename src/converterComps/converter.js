import React from "react";
import { useRef, useState, useEffect } from "react";

function Converter(props) {
  const [coins, setCoins] = useState({
    firstInp: "",
    secondInp: "",
    quntityInp: 0,
  });
  const [curencies, setCurencies] = useState({});
  const [flag, setFlag] = useState(true);
  const [firstRun, setFirstRun] = useState(true);

  useEffect(() => {
    doApi();
    if (firstRun) {
      setFirstRun(false);
      return;
    }
    calcFunc();
  }, [flag]);

  const doApi = async () => {
    let URL =
      "http://apilayer.net/api/live?access_key=3c81786f9b3d2e267f40d08af97b97f2&currencies=usd,ils,eur,btc,thb";
    let resp = await fetch(URL);
    let data = await resp.json();
    let curencies = data.quotes;
    if (typeof curencies !== "undefined") {
      setCurencies(curencies);
      props.setTime(data.timestamp);
      console.log(data.timestamp);
    } else {
      // return JSON.parse({ "server id down": "lll" });
      alert("server is down");
    }
  };

  let inputQRef = useRef();
  let inputRef1 = useRef();
  let inputRef2 = useRef();

  let calcFunc = () => {
    props.setSign(coins.secondInp);
    let answear;
    if (coins.firstInp == "" || coins.secondInp == "") {
      alert("you forgot to choose currencies");
    } else {
      let answear =
        (coins.quntityInp / curencies[coins.firstInp]) *
        curencies[coins.secondInp];

      if (coins.firstInp == "USDBTC" || coins.secondInp == "USDBTC") {
        props.setDisplay(answear.toFixed(8));
      } else props.setDisplay(answear.toFixed(2));
    }
  };
  let invertFunc = () => {
    let tempinputRef = inputRef2.current.value;
    let firstCoin = coins.firstInp;
    let secondCoin = coins.secondInp;
    inputRef2.current.value = inputRef1.current.value;
    inputRef1.current.value = tempinputRef;
    setCoins({ ...coins, firstInp: secondCoin, secondInp: firstCoin });
    !flag ? setFlag(true) : setFlag(false);
    console.log(flag);
  };

  return (
    <nav className="container-fluid bg-dark ">
      <div className="container d-flex justify-content-center">
        <div className="row d-flex align-items-lg-center p-3">
          <div className="col-lg-2 col-sm-12 my-3 me-1">
            <input
              className="col-lg-12"
              placeholder={"Quantity"}
              style={{ border: "none", outlinestyle: 0 }}
              type="number"
              ref={inputQRef}
              onChange={() => {
                setCoins({ ...coins, quntityInp: inputQRef.current.value });
              }}
            ></input>
          </div>

          <div className="mx-auto col-sm-6 p-3 col-lg-2  mx-4 ">
            <select
              style={{ border: "none", outlinestyle: 0 }}
              onChange={() => {
                setCoins({ ...coins, firstInp: inputRef1.current.value });
              }}
              ref={inputRef1}
              className="form-select"
            >
              <option value="">From</option>
              <option value="USDUSD">USD</option>
              <option value="USDEUR">EUR</option>
              <option value="USDILS">ILS</option>
              <option value="USDBTC">BTC</option>
              <option value="USDTHB">THB</option>
            </select>
          </div>
          <div className="m-3 mx-auto col-lg-2 p-0">
            <button
              onClick={invertFunc}
              className="col-lg-12  col-sm-4 btn btn-outline-light "
            >
              Invert ⚡
            </button>
          </div>
          <div className="mx-auto col-sm-6 p-3 col-lg-2 mx-4 my-3">
            <select
              onChange={() => {
                setCoins({ ...coins, secondInp: inputRef2.current.value });
              }}
              ref={inputRef2}
              className="form-select"
            >
              <option value="">To</option>
              <option value="USDUSD">USD</option>
              <option value="USDEUR">EUR</option>
              <option value="USDILS">ILS</option>
              <option value="USDBTC">BTC</option>
              <option value="USDTHB">THB</option>
            </select>
          </div>
          <div className="col-lg-3">
            <button
              className="btn btn-outline-warning col-lg-12 col-sm-4"
              onClick={calcFunc}
            >
              CONVERT
            </button>
          </div>
          {/* <h1>{JSON.stringify(coins)}</h1> */}
        </div>
      </div>
    </nav>
  );
}

export default Converter;
