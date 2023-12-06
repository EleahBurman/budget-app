import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch ('http://localhost:4000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // username: username,
        email: email,
        password: password,
        // passwordConfirmation: passwordConfirmation
      })
    })

    if(!response.ok){
      const body = await response.text();
      console.error(body);
      return;
    }

    const body = await response.json();
    console.log(body, "is this login body");

    //store token in local storage
    const accessToken = body.accessToken;
    localStorage.setItem('accessToken', accessToken);
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} >
      
      <label className="singup-label" >Email</label>
      <input type="text" className="email-input" onChange={(e)=>{setEmail(e.target.value)}} value={email}></input>
      <label className="singup-label">Password</label>
      <input type="text" className="password-input" onChange={(e)=>{setPassword(e.target.value)}} value={password}></input>
      <button 
        type="submit"
        className="btn btn--dark"
        style={{marginTop: "1rem"}}
      >Login</button>
    </form>
  )
}

export default LoginForm