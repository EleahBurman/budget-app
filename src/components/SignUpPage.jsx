// library
// import { toast } from "react-toastify";
import { useState } from "react";

//helpers
// import { createUser } from "../helpers";

//form components
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";

import { Link } from "react-router-dom";


// loader
// export async function signupLoader(){
//   const response = await fetch(`/api/users/signup`);
//   const user = await response.json();
//   console.log(user, "is this hitting user")
//   if(!user){
//     throw new Error("The user you’re trying to find doesn’t exist");
//   }
//   return user;
// }

//action
// export async function signupAction({request}){
//   const data = await request.formData();
//   const {_action, ...values} = Object.fromEntries(data);

//   if(_action === "newUser"){
//     try{
//       const response = await createUser({
//         username: values.userName,
//         email: values.email,
//         password: values.password,
//       });
//       return toast.success(`Welcome, ${response.username}`)
//     }catch(e){
//       throw new Error("There was a problem creating your account.")
//     }
//   }
// }

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
          </p>
          <Link
            
            onClick={() => setShowLogin(false)}
            
            style={{  color: "blue", fontSize: "19.2px" }}
          >
            Sign Up
          </Link>
          
        </>
      ) : (
        <>
          <SignUpForm signupAction={signupAction} />
          <p className="signup-label" style={{ marginTop: "1rem", fontSize: "19.2px" }}>Already a member? 
          </p>
          <Link
            
            onClick={() => setShowLogin(true)}
            
            style={{ color: "blue", fontSize: "19.2px" }}
          >
            Login
          </Link>
          
        </>
      )}
    </>
  );
}

export default SignUpPage