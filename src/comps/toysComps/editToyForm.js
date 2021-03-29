import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { doApiGet, doApiMethod, URL_API } from "../services/apiSer";
import { useHistory } from "react-router";
import "../css/dark.css";
import { Link } from "react-router-dom";

function EditToyForm(props) {
  let history = useHistory();
  // מכיל את הפרמטר שאספנו מהרואט יו אר אל
  let editid = props.match.params.editId;
  let pageNum = props.match.params.pageNum;
  let [toyData, setToyData] = useState({});
  let [formEditDisplay, setFormEditDisplay] = useState("block");
  let catForm_ar = ["sport", "boys", "girls"];

  const { register, handleSubmit, errors } = useForm();
  let nameRef = register({ required: true, minLength: 3 });
  let infoRef = register({ required: true, minLength: 1 });
  let catRef = register({ required: true });
  let imgRef = register({});
  let priceRef = register({ required: true, min: 1 });

  useEffect(() => {
    getToyDataFromApi();
  }, []);

  const getToyDataFromApi = async () => {
    let url = URL_API + "/toys/single/" + editid;
    let data = await doApiGet(url);
    setToyData(data);
    console.log(data);
  };

  const onFormSub = (dataBody) => {
    //dataBody -> מכיל אובייקט עם המאפיינים לפי השמות של האינפוטים והסלקטים
    console.log(dataBody);

    doApi(dataBody);
  };

  const doApi = async (dataBody) => {
    let url = URL_API + "/toys/" + editid;
    let data = await doApiMethod(url, "PUT", dataBody);
    console.log(data);
    if (data.n == 1) {
      alert("question updated");
      history.push("/userlist/" + pageNum);
    }
  };
  const changeDisplay2 = () => {
    formEditDisplay != "none"
      ? setFormEditDisplay("none")
      : setFormEditDisplay("block");
  };

  return (
    <div
      className=" dark_window mx-auto"
      style={{ display: formEditDisplay }}
      // onClick={() => {
      //   changeDisplay2();
      // }}
    >
      <form
        style={{ display: formEditDisplay }}
        onSubmit={handleSubmit(onFormSub)}
        className="add-Form col-lg-6 mx-auto p-2 shadow mt-3 dark_box_inside"
      >
        <h1>Edit your Toy</h1>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            defaultValue={toyData.name}
            ref={nameRef}
            name="name"
            type="text"
            className="form-control"
            id="name"
          />
          {/* האירור לפי השם של האינפוט מייצר לעצמו מאפיין אם יש שם טעות */}
          {errors.name && (
            <span className="text-danger">Please enter valid name</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="info" className="form-label">
            info:
          </label>
          <input
            defaultValue={toyData.info}
            ref={infoRef}
            name="info"
            type="text"
            className="form-control"
            id="info"
          />
          {/* האירור לפי השם של האינפוט מייצר לעצמו מאפיין אם יש שם טעות */}
          {errors.info && (
            <span className="text-danger">Please enter some information</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            ref={catRef}
            name="category"
            id="category"
            className="form-select"
          >
            {/* <option value="sport">Sport</option>
            <option value="boys">Boys</option>
            <option value="girls">Girls</option> */}
            {catForm_ar.map((item, i) => {
              return (
                <option
                  selected={toyData.category == item}
                  key={i}
                  value={item}
                >
                  {item}
                </option>
              );
            })}
          </select>
          {errors.category && (
            <span className="text-danger">Please choose cateogry</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="img" className="form-label">
            Image url
          </label>
          <input
            defaultValue={toyData.img_url}
            ref={imgRef}
            name="img_url"
            type="text"
            className="form-control"
            id="img_url"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price:
          </label>
          <input
            defaultValue={toyData.price}
            ref={priceRef}
            name="price"
            type="number"
            className="form-control"
            id="price"
          />
          {/* האירור לפי השם של האינפוט מייצר לעצמו מאפיין אם יש שם טעות */}
          {errors.price && (
            <span className="text-danger">
              Please enter the price of the item
            </span>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
      <div
        className="text-center"
        onClick={() => {
          changeDisplay2();
        }}
      >
        <Link to={"/userlist/" + pageNum} className="text-light mt-2">
          close
        </Link>
      </div>
    </div>
  );
}

export default EditToyForm;
