import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { doApiMethod, URL_API } from "../services/apiSer";
import AddToy from "./addToyForm";
import Toy from "./toyElem";

function UserList(props) {
  let history = useHistory();
  let [arr, setArr] = useState([]);
  useEffect(() => {
    // בודק בכלל שיש טוקן אצל הצד לקוח
    if (!localStorage["tok"]) {
      history.push("/login");
    }
    doApi();
  }, [props]);

  const doApi = async () => {
    let url = URL_API + "/toys/userlist";
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
    console.log(url);

    let data = await doApiMethod(url, "DELETE", {});
    doApi();
  };

  return (
    // <React.Fragment></React.Fragment>
    <main className="container ">
      {arr.map && <AddToy />}
      <div className="row">
        {arr.map ? (
          arr.map((item) => {
            return <Toy item={item} deleteItem={deleteItem} key={item._id} />;
          })
        ) : (
          <div>You have to login first!!!</div>
        )}
      </div>
    </main>
  );
}

export default UserList;
