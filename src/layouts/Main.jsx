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

  const [user, setUser] = useState({}); //global state
  const navigate = useNavigate()

  useEffect  (() => {
    console.log("why is this getting lost",authuser)
    // if(!authuser?.name){
    //   navigate('users/signup')
    // }
  }, [])

  

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
      <Nav userName={authuser?.name} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main>
        <Outlet context={[isLoggedIn, setIsLoggedIn, user, setUser]}/>
      </main>
      <img src={wave} alt="" />
    </div>
  );
};

export default Main;