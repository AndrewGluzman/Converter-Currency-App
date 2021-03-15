import React from "react";
import { Link } from "react-router-dom";

function Toy(props) {
  let item = props.item;
  return (
    <div className="col-lg-3 p-2">
      <div className="border overflow-hidden shadow rounded p-2">
        <div>
          <img src={item.img_url} className="float-end ms-2 w-100" />
          <h2 className="p-2">{item.name}</h2>
          <p className="ps-2">Info: {item.info}</p>
          <p className="ps-2">Price:{item.price}</p>
          <p className="ps-2">Category:{item.category}</p>
          <div className="ps-2">Date: {item.date_created}</div>
        </div>
        <div className="my-2">
          <button
            onClick={() => {
              props.deleteItem(item._id);
            }}
            className="btn btn-danger"
          >
            DELETE
          </button>
          <Link to={"/userlist/edit/" + item._id} className="btn btn-dark ms-2">
            EDIT
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Toy;