import React, { useState } from 'react';
import { useForm } from "react-hook-form";

function AppForm(props) {
  let [infoFlag , setInfoFlag] = useState(false);

  // מייצר 3 משתנים שיעזרו לנו לולדזציה בצד לקוח
  const { register, handleSubmit, errors } = useForm();
// 13:10

// register -> 
// 1. בודק לנו ולדזציה לכל ריף שאנחנו מייצרים לאינפוט
// 2. בנוסף מחבר אותו ל יוז פורם גם לשגיאות שלו וגם לפונקציה
// ONFORMSUB ומכניס אותו לתוך הדאטא כמאפיין ואז קל לשגר את זה לצד שרת 
// כבאדי

// pattern -> מקבל ריגולר אקספריישן במקרה שלנו בודקים שהאימייל תקני
  let emailRef = register({required:true ,pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i });
  let phoneRef = register({required:true , pattern: /^[\+]?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im});
  let nameRef = register();

  // הפונקציה תעבוד רק אם כל הולדזציה עברה אישור
  const onFormSub = (data) => {
    // Data -> מחזיק מאפיינים בשמות של האינפוטים עם הערך שלהם
    console.log(data); 
  }

  // handleSubmit -> פונקציה שבדוקת את הולדזציה לפי הריג'סטר
  return (
    <form onSubmit={handleSubmit(onFormSub)} className="col-lg-6 mx-auto p-2 shadow mt-3">
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input ref={emailRef} name="n_email" type="text" className="form-control" id="email" />
        {/* האירור לפי השם של האינפוט מייצר לעצמו מאפיין אם יש שם טעות */}
        {errors.n_email && <span className="text-danger">Please enter valid Email</span>}
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Phone</label>
        <input ref={phoneRef} name="n_phone" type="tel" className="form-control" id="phone" />
        {errors.n_phone && <span className="text-danger">Please enter Phone</span>}
      </div>
      <div className="mb-3">
        <label htmlFor="tname" className="form-label">Name</label>
        <input ref={nameRef} name="n_name" type="text" className="form-control" id="tname" />
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>

      {/* אין קשר לטופס , רק לבדיקה איך ניתן להציג מידע עם בולייאן */}
      <div>
      {
        //(infoFlag) ? <span className="text-danger">You need to know js to continue</span> : ""
      }
      {/* שיטה כדי להסתיר או להציג ג'יי אס איקס */}
      { infoFlag && <span className="text-success">You need to know js to continue</span>}
     

      <button type="button" onClick={() => {
        // ! -> יהפוך את המשתנה להפך ממה שהוא עכשיו כבוליאן
        setInfoFlag(!infoFlag);
      }}>show Info</button>
      </div>
    </form>
  )
}

export default AppForm