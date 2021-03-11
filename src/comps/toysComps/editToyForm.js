import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { doApiGet, doApiMethod, URL_API } from "../services/apiSer";
import { useHistory } from "react-router";

function EditToyForm(props) {
  let history = useHistory();
  // מכיל את הפרמטר שאספנו מהרואט יו אר אל
  let editid = props.match.params.editId;
  let [toyData, setToyData] = useState({});
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
      history.push("/userlist");
    }
  };

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit(onFormSub)}
        className="col-lg-6 mx-auto p-2 shadow mt-3"
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
            value={toyData.category}
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
          Add new Toy!
        </button>
      </form>
    </div>
  );
}

export default EditToyForm;
