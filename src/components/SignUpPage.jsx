// library
// import { toast } from "react-toastify";
import { useState } from "react";

//helpers
// import { createUser } from "../helpers";

//form components
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";


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
    <div>
      {
        showLogin?  <><LoginForm />
        <p>Not a member?</p><button 
          onClick={()=>setShowLogin(false)}
          className="btn btn--dark"
          style={{marginTop: "1rem", opacity: "60%"}}
        >Sign Up</button></> :
        <><SignUpForm signupAction={signupAction}/>
        <p
          style={{marginTop: "1rem"}}>Already a member?</p><button 
          onClick={()=>setShowLogin(true)} 
          className="btn btn--dark"
          style={{opacity: "60%"}}
        >Login</button></>
      }
      
      
    </div>
  )
}

export default SignUpPage