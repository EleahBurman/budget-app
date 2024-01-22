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
  return user
}

const Main = () => {
  const authuser = useLoaderData()

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
        cookieName="refreshTokenConsent"
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