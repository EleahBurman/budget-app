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
export function mainLoader(){
  const userName = fetchData("userName");
  return { userName }
}

const Main = () => {
  const { userName } = useLoaderData()

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState({}); //global state
  const navigate = useNavigate();
  
  const getUser = async () => {
    console.log(1);
    const response = await fetch("/api/users/current");
    const data = await response.json();
    console.log("check this",data);
    if(data){
      setUser(data);
      navigate("/")
    }
    
    //setUser(data);
  }

  useEffect(() => { 
    getUser();

  },[]);

  return (
    <div className="layout">
      <Nav userName={userName} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main>
        <Outlet context={[isLoggedIn, setIsLoggedIn, user, setUser]}/>
      </main>
      <img src={wave} alt="" />
    </div>
  );
};

export default Main;