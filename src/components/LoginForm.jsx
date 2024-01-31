//react imports
import { useEffect, useState, useRef } from "react"

//rrd imports
import { useNavigate } from "react-router-dom"

//library imports
import { EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";

import { Tooltip } from 'react-tooltip'

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef()
  const focusRef = useRef()
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if(!isSubmitting){
      formRef.current.reset()
      focusRef.current.focus()
    }
  }, [isSubmitting])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true);
  
    // Delay the form submission by 2 seconds
    //setTimeout(async () => {
      const response = await fetch ('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          keepLoggedIn: keepLoggedIn,
        })
      })
  
      setIsSubmitting(false);
      if(!response.ok){
        
        const body = await response.text();
        console.error(body);
        return;
      }
  
      const body = await response.json();
  
      //store token in local storage
      const accessToken = body.accessToken;
      localStorage.setItem('accessToken', accessToken);

      const responseAccessToken = await fetch('/api/users/refreshtoken', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: accessToken,
        })
      })
      const userInfo = await responseAccessToken.json();
      console.log(userInfo, "is this response")

      //setUser(userInfo);
      navigate('/')


    //}, 1500);
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      ref={formRef}>
      <Tooltip id="email-tooltip" anchorSelect="#email-label"/>
      <label 
        id="email-label"
        data-tooltip-id="email-tooltip"
        data-tooltip-content="Enter your email"
        data-tooltip-place="top-start">Email</label>
      <input 
        type="text" 
        className="email-input"
        placeholder="Enter your email"
        onChange={(e)=>{setEmail(e.target.value)}} 
        value={email} 
        ref={focusRef}
        aria-label="Email"
        style={{width: "100%"}}></input>
      
      <Tooltip id="password-tooltip" anchorSelect="#password-label"/>
      <label 
        id="password-label"
        data-tooltip-id="password-tooltip"
        data-tooltip-content="Enter your password"
        data-tooltip-place="top-start">Password</label>
      <div className="password-input-container" style={{ position: "relative", width: "100%" }}>
        <input
          autoComplete="new-password"
          type={showPassword ? 'text' : 'password'}
          className="password-input"
          placeholder="Enter your password"
          onChange={(e) => { setPassword(e.target.value) }}
          value={password}
          aria-label="Password"
          style={{width: "100%"}}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{ background: "none", border: "none", cursor: "pointer", position: "absolute", right: "5px", top: "25%"}}
          aria-label={showPassword ? "Hide Password" : "Show Password"}
        >
          {showPassword ? (
            <EyeIcon width={20} />
          ) : (
            <EyeSlashIcon width={20} />
          )}
        </button>
      </div>

      <label>
        Remember Me
        &nbsp; <input
        type="checkbox"
        checked={keepLoggedIn}
        onChange={() => setKeepLoggedIn(!keepLoggedIn)}
        style={{ width: "auto"}}
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
              <span>Login</span>
            </>
          )
        }
      </button>
    </form>
  )
}

export default LoginForm