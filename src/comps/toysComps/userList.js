import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { doApiMethod, URL_API } from "../services/apiSer";
import AddToy from "./addToyForm";
import Toy from "./toyElem";
import PageNav from "./pagesNav";
import "../css/style.css";

function UserList(props) {
  let history = useHistory();
  let [arr, setArr] = useState([]);
  let [formDisplay, setFormDisplay] = useState("none");
  let [page, setPage] = useState(0);

  useEffect(() => {
    // בודק בכלל שיש טוקן אצל הצד לקוח
    if (!localStorage["tok"]) {
      history.push("/login");
    }
    doApi();
  }, [props]);

  const changeDisplay = () => {
    formDisplay != "none" ? setFormDisplay("none") : setFormDisplay("block");
  };

  const doApi = async () => {
    let url = !props.match.params.pageNum
      ? URL_API + "/toys/userlist"
      : URL_API + "/toys/limit/5?page=" + props.match.params.pageNum;

    setPage(props.match.params.pageNum);
    console.log("Page is " + page);

    console.log(url);

    let data = await doApiMethod(url, "POST", {});
    // props.setArr(data);
    // history.push("/");
    setArr(data);

    if (data) {
      console.log(data);
    }
  };

  let deleteItem = async (_itemId) => {
    let url = URL_API + "/toys/" + _itemId;

    let data = await doApiMethod(url, "DELETE", {});
    doApi();
  };

  return (
    // <React.Fragment></React.Fragment>
    <main className="container ">
      <PageNav />

      <div className="row">
        {arr.map ? (
          arr.map((item) => {
            return <Toy item={item} deleteItem={deleteItem} key={item._id} />;
          })
        ) : (
          <div>You have to login first!!!</div>
        )}
        <div className="col-lg-3 p-2">
          <div
            className="border overflow-hidden shadow rounded p-2 d-flex align-items-center text-center "
            style={{ height: "440px" }}
          >
            <div className=" ">
              <img
                src="https://snipstock.com/assets/cdn/png/f8ae7b8732fb4b39a99dad8c97fdc664.png"
                className="float-end ms-2 w-100 add-btn"
                onClick={() => {
                  changeDisplay();
                }}
              />
              <h2 className="p-2">Add new</h2>
            </div>
          </div>
        </div>
        {arr.map && (
          <AddToy display={formDisplay} displayFunc={changeDisplay} />
        )}
      </div>
    </main>
  );
}

export default UserList;
