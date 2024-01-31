
import { useState } from "react";

//form components
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";

import { Link } from "react-router-dom";

export async function signupAction(userData){
  fetch('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
}

const SignUpPage = () => {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {showLogin ? (
        <>
          <LoginForm />
          <p style={{ marginTop: "1rem", fontSize: "19.2px" }}>Not a member?
          <br /><Link
            
            onClick={() => setShowLogin(false)}
            
            style={{  color: "#1bbbc3", fontSize: "19.2px", fontWeight: "bold"  }}
          >
            Sign Up
          </Link>
          </p>
          
          
        </>
      ) : (
        <>
          <SignUpForm signupAction={signupAction} />
          <p style={{ marginTop: "1rem", fontSize: "19.2px" }}>Already a member?
          <br /><Link
            
            onClick={() => setShowLogin(true)}
            
            style={{ color: "#1bbbc3", fontSize: "19.2px", fontWeight: "bold"  }}
          >
            Login
          </Link> 
          </p>
          
          
        </>
      )}
    </>
  );
}

export default SignUpPage