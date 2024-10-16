import React, { createContext, useState, } from "react";
import { replace, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  //hooks
  const [user, setUser] = useState(null);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  

  const navigate = useNavigate();

  


  const loginUser = async (email, password) => {
    try {
      const fetchData = await fetch("/data.json");
      const res = await fetchData.json();

      const userCredentials = res.user;

      const result = userCredentials.find(
        (x) => x.email === email && x.password === password
      );

     
      

     
      if (result) {
        const { password, ...infoLOgin } = result;
        setUser(infoLOgin);
        localStorage.setItem("userlo",JSON.stringify(infoLOgin))
        // Navigate to home directly after login
        navigate("/",{replace:true});
      } else {
        toast.error("invalid email or password");
      }
      
    } catch (error) {
      console.log(error, "error");
    }
    
  };
 

  
  return (
    <div>
      <AuthContext.Provider value={{ loginUser, user, setUser }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export { AuthContext, AuthContextProvider };
