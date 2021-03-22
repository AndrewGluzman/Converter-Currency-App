import React, { useEffect, useState } from "react";

function Main(props) {
  let arr = props.list;

  return (
    <main className="container ">
      <div className="row">
        {arr.map((item, i) => {
          return (
            <div key={i} className=" col-lg-4 p-2">
              <div
                className="  toy border overflow-hidden shadow rounded p-2   "
                style={{ height: "440px" }}
              >
                <div style={{ height: "220px" }}>
                  <img src={item.img_url} className="float-end ms-2 w-100 " />
                </div>
                <div className="">
                  <h2 className="p-2">{item.name}</h2>
                  <p className="ps-2">Info: {item.info}</p>
                  <p className="ps-2">Price: {item.price}$</p>
                  <p className="ps-2">Category: {item.category}</p>
                  <div className="ps-2">Date: {item.date_created}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default Main;
