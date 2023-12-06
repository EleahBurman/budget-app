// library
import { toast } from "react-toastify";


//helpers
import { createUser } from "../helpers";

//form components
import SignUpForm from "../components/SignUpForm";

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
  fetch('http://localhost:4000/api/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
}

const SignUpPage = () => {
  return (
    <div>
      <SignUpForm signupAction={signupAction}/>
    </div>
  )
}

export default SignUpPage