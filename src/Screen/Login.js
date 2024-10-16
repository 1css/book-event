import React, {  useContext, useState } from "react";
import "../CSS/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {AuthContext}  from '../context/AuthContext'
import Loader from '../Components/Loader'

function Login() {
  //State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser }=useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  //use
  const navigate = useNavigate();

  //function
  

  const submitHandler = async (event) => {
    
    event.preventDefault();
    setLoading(true)

    if (!email || !password) {
      setLoading(false)
      toast.error("please enter all the required fields!");
      return;
    }

    
    try {
      await loginUser(email,password);
      
    } catch (error) {
      console.log(error);
      
      
    }finally{
      setLoading(false)
    }
  };
  
  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} />
      <div id="login-body">
      
        <div className="Loginmain1">
          <form onSubmit={submitHandler}>
            <h1>Login</h1>
            <div className="Login-input-content">
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="Login-input-content">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="remember">
              <a href="/#">Forgot your Password?</a>
            </div>

            <button type="submit" id="logbu">
              {loading ? <>loading... </>:"Login"}
            </button>
          </form>
          
          <div>
         
          </div>
          {/* <div id="logfoot">
            <p id="footp">
              Don't have an account?{" "}
              <Link to="/register">
                <button id="idbut"> Register </button>
              </Link>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
