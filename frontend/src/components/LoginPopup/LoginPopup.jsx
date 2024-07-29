import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopup = ({setshowlogin}) => {

  const {url,setToken} = useContext(StoreContext)
    const[currstate,setcurrstate] = useState("Login")
    const  [data,setData]=useState({
    name:"",
    email:"",
    password:""
   })

   const onChangehandler = (event) => {
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
   }

   const onLogin = async (event) => {
      event.preventDefault();
      let newUrl=url;
      if(currstate === "Login"){
        newUrl += "/api/user/login"
      }
      else{
        newUrl += "/api/user/register"
      }

      const responce = await axios.post(newUrl,data);

      if(responce.data.success) {
        setToken(responce.data.token);
        localStorage.setItem("token", responce.data.token);
        setshowlogin(false)
      }
      else{
        alert(responce.data.message)
      }
   }


  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container' action="">
        <div className="login-popup-title">
            <h2>{currstate}</h2>
            <img onClick={()=>setshowlogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
            {currstate==="Login"?<></>:<input name='name' onChange={onChangehandler} value={data.name}  type="text" placeholder='Your Name' required />}
            <input name='email' onChange={onChangehandler} value={data.email}  type="email" placeholder='Your Email'  required/>
            <input name='password' onChange={onChangehandler} value={data.password} type="password" placeholder='password' required />
        </div>
        <button type='submit'>{currstate==="sign up"? "Create Account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing , i agree to the terms of use & Privacy policy</p>
        </div>
        {currstate==='Login'?
        <p>Create a new account ? <span onClick={()=>setcurrstate("sign up")}>Click here</span></p>
        : <p>Already have an account ? <span onClick={()=>setcurrstate("Login")}>Login here</span></p>}
        
       
    </form> 
    </div>
  )
}

export default LoginPopup
