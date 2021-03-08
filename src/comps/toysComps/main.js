import React, { useEffect, useState } from "react";

function Main(props) {
  let [arr, setArr] = useState([]);
  useEffect(() => {
    doApi("https://toys4sale.herokuapp.com/toys?page=2");
  }, []);
  const doApi = async (_url) => {
    let resp = await fetch(_url);
    let data = await resp.json();
    console.log(data);
    setArr(data);
  };

  return (
    <main className="container ">
      <div className="row">
        {arr.map((item) => {
          return (
            <div className="col-lg-4 p-2">
              <div className="border overflow-hidden shadow rounded">
                <img src={item.img_url} className="float-end ms-2 w-100" />
                <h2 className="p-2">{item.name}</h2>
                <p className="ps-2">{item.info}</p>
                <p className="ps-2">{item.price}</p>
                <p className="ps-2">{item.category}</p>
                <div className="ps-2">Year: {item.date_created}</div>
                {/* <Link to={"/info/" + item.imdbID} className="ms-2 btn btn-dark">
                  More info
                </Link> */}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default Main;
