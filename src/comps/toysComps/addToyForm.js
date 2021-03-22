import React from "react";
import { useForm } from "react-hook-form";
import { doApiMethod, URL_API } from "../services/apiSer";
import { useHistory } from "react-router";
import "../css/dark.css";

function AddToy(props) {
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  let nameRef = register({ required: true, minLength: 3 });
  let infoRef = register({ required: true, minLength: 1 });
  let catRef = register({ required: true });
  let imgRef = register({});
  let priceRef = register({ required: true, min: 1 });

  const onFormSub = (dataBody) => {
    //dataBody -> מכיל אובייקט עם המאפיינים לפי השמות של האינפוטים והסלקטים
    console.log(dataBody);

    doApi(dataBody);
  };

  const doApi = async (dataBody) => {
    // if (dataBody.img_url.length == 0) {
    //   // ימחוק מאפיין אימג מהאובייקט
    //    delete dataBody.img_url
    // }

    let url = URL_API + "/toys";
    let data = await doApiMethod(url, "POST", dataBody);
    console.log(data);
    // props.doApii;
    history.push("/userlist/" + props.page);

    if (data._id) {
      alert("toy added");
    }
  };
  return (
    <div
      className="container dark_window"
      style={{ display: props.display }}
      // onClick={() => {
      //   props.displayFunc();
      // }}
    >
      <form
        style={{ display: props.display }}
        onSubmit={handleSubmit(onFormSub)}
        className="add-Form col-lg-6 mx-auto p-2 shadow mt-3 dark_box_inside"
      >
        <h1>Add new Toy</h1>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
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
            <option value="sport">Sport</option>
            <option value="boys">Boys</option>
            <option value="girls">Girls</option>
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
          Add new Toy!
        </button>
      </form>
      <div
        className="text-center"
        onClick={() => {
          props.displayFunc();
        }}
      >
        <p className="text-light mt-2">close</p>
      </div>
    </div>
  );
}

export default AddToy;
