import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import Registration from "../pages/Registration";
import http from "../http";
import { authIntercepter } from "../authIntercepter";

const Login = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const [error, setError]=useState('')
  const [inputData, setinputData] = useState({  //для обработки inputa
    login:"",
    pass:""
  });
  // Проверка пароля
  const loginData = {login:"11", pass:"11"}

  const onChange =(e)=>{
      const field ={}
      field[e.target.id]=e.target.value 
      setinputData(({...inputData,...field}))
      setError('')
  }

  const login = () => { 
    http.post('/login', inputData).then((res)=>{
      if(res.data.message){
        setError(res.message)
        return 
      }
      localStorage.setItem('auth','true')
      localStorage.setItem('token', res.data.token)
      // http.authIntercepter.reqest.use(authIntercepter);
      http.interceptors.request.use(authIntercepter);
      setIsAuth(true)
    }).catch((err)=>setError('Wrong data'))
    setError("Error")
  }
  // console.log(inputData);


  return (
    <>
    <form className="container">
      <h3>Log in</h3>

      <div className="input-field col s6">
        <i className="material-icons prefix">account_circle</i>
        <input
          id="login"
          type="text"
          className="validate"
          placeholder="Enter Name"
          onChange={onChange}
        />
      </div>
      <div className="input-field col s6">
        <i className="material-icons prefix">account_circle</i>
        <input
          id="pass"
          type="password"
          className="validate"
          placeholder="Enter password"
          onChange={onChange}
        />

        {error && <span className="error">{error}</span>}
        <div className="row m-1">
        
          <div className="col s4">
          
            {/* <a
              className="waves-effect waves-light btn"
              onClick={() => login()}
            >
              Log in
            </a> */}
          </div>
        </div>
      </div>
      <a onClick={()=>login()} className="waves-effect waves-light btn m-1">Login</a>
      <Link className="waves-effect waves-light btn m-1" to='/registration'>Registration</Link>
    </form>
  
    </>
  );
};

export default Login;
