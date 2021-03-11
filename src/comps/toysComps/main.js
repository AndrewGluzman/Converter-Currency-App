import React, { useEffect, useState } from "react";

function Main(props) {
  let arr = props.list;

  return (
    <main className="container ">
      <div className="row">
        {arr.map((item) => {
          return (
            <div className="col-lg-4 p-2">
              <div className="border overflow-hidden shadow rounded">
                <img src={item.img_url} className="float-end ms-2 w-100" />
                <h2 className="p-2">{item.name}</h2>
                <p className="ps-2">Info: {item.info}</p>
                <p className="ps-2">Price: {item.price}</p>
                <p className="ps-2">Category: {item.category}</p>
                <div className="ps-2">Date: {item.date_created}</div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default Main;
