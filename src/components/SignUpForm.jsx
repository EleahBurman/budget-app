//react imports
import { useEffect, useState, useRef } from "react"

//rrd imports
import { useNavigate } from "react-router-dom"

//library imports
import PasswordStrengthBar from 'react-password-strength-bar';


const SignUpForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef()
  const focusRef = useRef()
  useEffect(() => {
    if(!isSubmitting){
      formRef.current.reset()
      focusRef.current.focus()
    }
  }, [isSubmitting])

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true);
    // setTimeout(async () => {


      const response = await fetch ('/api/users/signup', {
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
      console.log(body, "is this line 32");
      navigate('/')
      //backend - login as user once signed up
      //redirect to main page once backend is handled
      //pass the form to the main page and make it so user first sees signup form if not loggedin (going to use current)
    
    // }, 1500)
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      ref={formRef}>
      <label className="singup-label">Username</label>
      <input type="text" className="username-input" onChange={(e)=>{setUsername(e.target.value)}} value={username} ref={focusRef}></input>
      <label className="singup-label" >Email</label>
      <input type="text" className="email-input" onChange={(e)=>{setEmail(e.target.value)}} value={email}></input>
      <label className="singup-label">Password</label>
      <input type="password" className="password-input" onChange={(e)=>{setPassword(e.target.value)}} value={password}></input>
      <label className="singup-label">Confirm Password</label>
      <input autoComplete="off" type="password" className="confirm-password-input" onChange={(e)=>{setPasswordConfirmation(e.target.value)}} value={passwordConfirmation}></input>

      <label className="singup-label">Password Strength</label>
      <PasswordStrengthBar password={password} style={{marginTop: "20px"}}/>

      <button 
        type="submit"
        className="btn btn--dark"
        style={{marginTop: "1rem"}}
        disabled={isSubmitting}
      >
        {
          isSubmitting ?
          <span>Submitting...</span>:
          (
            <>
              <span>Sign Up</span>
            </>
          )
        }
      </button>
    </form>
  )
}

export default SignUpForm