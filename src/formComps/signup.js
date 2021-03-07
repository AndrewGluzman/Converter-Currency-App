import React from 'react';
import { useForm } from "react-hook-form";


function SignUp(props) {
  const { register, handleSubmit, errors } = useForm();

  let nameRef = register({ required: true, minLength: 2 });
  let emailRef = register({ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i });
  let passRef = register({ required: true, minLength: 3 })

  const formSend = (data) => {
    console.log(data);
    doApi(data)
   
  }

  const doApi = async(_body) => {
    let url = "http://localhost:3002/users/"
    let resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(_body),
      headers: {
        'content-type': "application/json"
      }
    })
    let data = await resp.json();
    console.log(data);
  }


  return (
    <div className="container">
      <form className="col-lg-6" onSubmit={handleSubmit(formSend)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input ref={nameRef} name="name" type="text" className="form-control" id="name" />
          {errors.name && <div className="text-danger">Min 2 letters length</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input ref={emailRef} name="email" type="text" className="form-control" id="email" />
          {errors.email && <div className="text-danger">Enter valid email</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="pass" className="form-label">Password</label>
          <input ref={passRef} name="pass" type="password" className="form-control" id="pass" />
          {errors.pass && <div className="text-danger">Min 3 letters length</div>}
        </div>

        {/* 14:53 */}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </div>
  )
}

export default SignUp