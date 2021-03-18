import React, { useEffect, useState } from "react";
import { doApiGet, URL_API, doApiMethod } from "../services/apiSer";
import { Link } from "react-router-dom";

function PageNav(props) {
  let [pages, setPages] = useState(0);

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = URL_API + "/toys/amount";
    let data = await doApiMethod(url, "POST", {});
    setPages(Math.ceil(data.count / 5));
    console.log(pages);
  };

  return (
    <div className="my-3">
      <span>Page:</span>
      {/* [...Array(x)] x מייצג את מספר התאים  */}
      {[...Array(pages)].map((item, i) => {
        return (
          <Link
            to={"/userlist/" + i}
            className="btn btn-light rounded-circle px-3 ms-1"
          >
            {i + 1}
          </Link>
        );
      })}
    </div>
  );
}

export default PageNav;
