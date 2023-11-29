import { useState } from "react"

const SignUpForm = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch ('http://localhost:4000/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation
      })
    })

    if(!response.ok){
      const body = await response.text();
      console.error(body);
      return;
    }

    const body = await response.json();
    console.log(body);
    //todo backend - login as user once signed up
    //todo redirect to main page once backend is handled
    //pass the form to the main page and make it so user first sees signup form if not loggedin (going to use current)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="singup-label">Username</label>
      <input type="text" className="username-input" onChange={(e)=>{setUsername(e.target.value)}} value={username}></input>
      <label className="singup-label" >Email</label>
      <input type="text" className="email-input" onChange={(e)=>{setEmail(e.target.value)}} value={email}></input>
      <label className="singup-label">Password</label>
      <input type="text" className="password-input" onChange={(e)=>{setPassword(e.target.value)}} value={password}></input>
      <label className="singup-label">Confirm Password</label>
      <input type="text" className="confirm-password-input" onChange={(e)=>{setPasswordConfirmation(e.target.value)}} value={passwordConfirmation}></input>
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default SignUpForm