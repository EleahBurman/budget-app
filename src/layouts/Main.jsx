//rrd imports
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";

//react imports
import { useEffect, useState } from "react";

//assets
import wave from "../assets/wave.svg"

//components
import Nav from "../components/Nav";

//helper functions
import { fetchData } from "../helpers"

//loader

//libraries
import CookieConsent from "react-cookie-consent";

export async function mainLoader(){
  const user = await fetchData("userName");
  console.log(user, "is this data correctly formed?")
  //if not userName object then we should navigate to the login page 
  // if(!user){
    
  // }
  return user
}

const Main = () => {
  const authuser = useLoaderData()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()  

  //see if i need to add back but currently using this call in helpers.js
  // const navigate = useNavigate();
  
  // const getUser = async () => {
  //   console.log(1);
  //   const response = await fetch("/api/users/current");
  //   const data = await response.json();
  //   console.log("check this",data);
  //   if(data){
  //     setUser(data);
  //     navigate("/")
  //   }
    
  //   //setUser(data);
  // }

  // useEffect(() => { 
  //   getUser();

  // },[]);

  return (
    <div className="layout">
      <Nav userName={authuser?.name} user={authuser} />
      <main>
        <Outlet context={[]}/>
      </main>
      <img src={wave} alt="" />
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="refreshToken"
        style={{ background: "#1bbbc3" }}
        buttonStyle={{ background: "black", color: "white", fontSize: "15px", borderRadius: "8px", padding: "5px"}}
        expires={150}
      >
        This website uses cookies to enhance the user experience.{" "}

      </CookieConsent>
    </div>
  );
};

export default Main;