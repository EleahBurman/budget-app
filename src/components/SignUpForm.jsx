//react imports
import { useEffect, useState, useRef } from "react"

//rrd imports
import { useNavigate } from "react-router-dom"

//library imports
import PasswordStrengthBar from 'react-password-strength-bar';
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";


const SignUpForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef()
  const focusRef = useRef()
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
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
          passwordConfirmation: passwordConfirmation,
          keepLoggedIn: keepLoggedIn,
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
    console.log("Keep me logged in:", keepLoggedIn);
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      ref={formRef}>
      <label className="singup-label">Username</label>
      <input type="text" className="username-input" onChange={(e)=>{setUsername(e.target.value)}} value={username} ref={focusRef}></input>
      <span className="input-requirements"><ExclamationCircleIcon width={15} />Minimum 5 characters, maximum 20 characters</span>
      <br />
      <label className="singup-label" >Email</label>
      <input type="text" className="email-input" onChange={(e)=>{setEmail(e.target.value)}} value={email}></input>
      <span className="input-requirements"><ExclamationCircleIcon width={15} />Minimum 5 characters, valid email address</span>
      <br />
      <label className="singup-label">Password</label>
      <input type="password" className="password-input" onChange={(e)=>{setPassword(e.target.value)}} value={password}></input>
      <span className="input-requirements"><ExclamationCircleIcon width={15} />Minimum 5 characters, at least one uppercase, one lowercase, and one number</span>
      <br />
      <label className="singup-label">Confirm Password</label>
      <input autoComplete="off" type="password" className="confirm-password-input" onChange={(e)=>{setPasswordConfirmation(e.target.value)}} value={passwordConfirmation}></input>
      <span className="input-requirements"><ExclamationCircleIcon width={15} />Match password</span>
      <br />


      <label className="singup-label">Password Strength</label>
      <PasswordStrengthBar password={password} style={{marginTop: "20px"}}/>

      <label>
        Keep me logged in
        <input
          type="checkbox"
          checked={keepLoggedIn}
          onChange={() => setKeepLoggedIn(!keepLoggedIn)}
        />
      </label>

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