import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { doApiMethod, URL_API } from "../services/apiSer";
import AddToy from "./addToyForm";

function UserList(props) {
  let history = useHistory();
  let [arr, setArr] = useState([]);
  useEffect(() => {
    // בודק בכלל שיש טוקן אצל הצד לקוח
    if (!localStorage["tok"]) {
      history.push("/login");
    }
    doApi();
  }, []);

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

  let func = () => {
    doApi();
  };

  return (
    // <React.Fragment></React.Fragment>
    <main className="container ">
      <AddToy doApii={func} />
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

export default UserList;
