//react imports
import { useEffect, useState, useRef } from "react"

//rrd imports
import { useNavigate } from "react-router-dom"

//library imports
import { EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";

//utility import
import { Tooltip } from 'react-tooltip'

//style import
import { toast } from "react-toastify";

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

  const [emailPrefix, setEmailPrefix] = useState("");
  const [emailSuffix, setEmailSuffix] = useState("@gmail.com");
  const [customSuffix, setCustomSuffix] = useState("");
  const [isOtherSelected, setIsOtherSelected] = useState(false);

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

      if (!response.ok) {
        try {
          // Using response.json() to parse the error message as JSON
          const body = await response.json();
    
          console.error(body);
    
          if (body && body.message) {
            toast.error("An error occurred during login. Please check your username and password");
          } else {
            toast.error("An error occurred during login. Please try again.");
          }
        } catch (error) {
          console.error(error);
          toast.error("An error occurred. Please try again.");
        }
    
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

  useEffect(() => {
    const email = emailPrefix + emailSuffix;
    setEmail(email);
  }, [emailPrefix, emailSuffix]);

  const handleSuffixChange = (e) => {
    const value = e.target.value;
    setEmailSuffix(value);

    if (value === "other") {
      setIsOtherSelected(true);
    } else {
      setIsOtherSelected(false);
    }
  };

  const handleCustomSuffixChange = (e) => {
    const value = e.target.value;
    setCustomSuffix(value);
    setEmailSuffix(value);
  };

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
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Enter your email"
          className="email-input"
          aria-label="Email"
          onChange={(e) => setEmailPrefix(e.target.value)}
          value={emailPrefix}
          ref={focusRef}
        />
        {isOtherSelected ? (
          <input
            type="text"
            placeholder="Enter your email domain"
            onChange={handleCustomSuffixChange}
            value={customSuffix}
          />
        ) : (
          <select
            value={emailSuffix}
            onChange={handleSuffixChange}
          >
            <option value="@gmail.com">@gmail.com</option>
            <option value="@aol.com">@aol.com</option>
            <option value="@msn.com">@msn.com</option>
            <option value="@yahoo.com">@yahoo.com</option>
            <option value="other">Other</option>
          </select>
        )}
      </div>
      <input
        type="hidden"
        value={email}
        name="email"
      />
      
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

      <div className="button-and-remember" style={{display: "flex" }}>
        <button
          type="submit"
          className="btn btn--dark"
          style={{ marginTop: "1rem" }}
          disabled={isSubmitting}
        >
          {
            isSubmitting ?
              <span>Submitting...</span> :
              (
                <>
                  <span>Login</span>
                </>
              )
          }
        </button>
        <label style={{alignSelf: "flex-start" }}>
          &nbsp;
          &nbsp; 
          <input
              type="checkbox"
              checked={keepLoggedIn}
              onChange={() => setKeepLoggedIn(!keepLoggedIn)}
              style={{ width: "auto", cursor: "pointer", marginTop: "20%" }}
            />
          &nbsp; 
          Remember Me?
        </label>
      </div>
    </form>
  )
}

export default LoginForm