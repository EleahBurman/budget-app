//react imports
import { useEffect, useState, useRef } from "react";

//rrd imports
import { useNavigate } from "react-router-dom";

//utility import
import { Tooltip } from 'react-tooltip';
import PasswordStrengthBar from 'react-password-strength-bar';

//library import
import { ExclamationCircleIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

//style import
import { toast } from "react-toastify";

const SignUpForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();
  const focusRef = useRef();
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  const [username, setUsername] = useState('');
  const [emailPrefix, setEmailPrefix] = useState("");
  const [emailSuffix, setEmailSuffix] = useState("@gmail.com");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await fetch('/api/users/signup', {
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
    });

    if (!response.ok) {
      try {
        // Using response.json() to parse the error message as JSON
        const body = await response.json();
  
        console.error(body);
  
        if (body && body.message) {
          toast.error("An error occurred during signup. Please check the requirements and try again.");
        } else {
          toast.error("An error occurred during signup. Please try again.");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred. Please try again.");
      }
  
      return;
    }

    navigate('/');

    setIsSubmitting(false);

    console.log("Keep me logged in:", keepLoggedIn);
  };

  useEffect(() => {
    const email = emailPrefix + emailSuffix;
    setEmail(email);
    console.log("did this work to combine email", email)
    console.log(("this is prefix", emailPrefix))
    console.log(("this is suffix", emailSuffix))
  }, [emailPrefix, emailSuffix]);

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <Tooltip id="username-tooltip" anchorSelect="#username-label" effect="solid"/>
      <label
        id="username-label"
        data-tooltip-id="username-tooltip" 
        data-tooltip-content="Enter your username"
        data-tooltip-place="top-end">Username</label>
      <input
        type="text"
        className="username-input"
        placeholder="Enter your username"
        onChange={(e) => { setUsername(e.target.value) }} value={username} ref={focusRef}
        aria-label="Username"
      />
      
      <span className="input-requirements"><ExclamationCircleIcon width={15} />Minimum 5 characters, maximum 20 characters</span>
      <br />
      <Tooltip id="email-tooltip" anchorSelect="#email-label" effect="solid"/>
      <label
        id="email-label"
        data-tooltip-id="email-tooltip"
        data-tooltip-content="Enter your email"
        data-tooltip-place="top-end">Email</label>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          className="email-input"
          placeholder="Enter your email"
          onChange={(e) => setEmailPrefix(e.target.value)}
          value={emailPrefix}
          aria-label="Email"
        />
        <select
          value={emailSuffix}
          onChange={(e) => {
            setEmailSuffix(e.target.value);
            console.log("is this select changing", e.target.value);
          }}
        >
          <option value="@gmail.com">@gmail.com</option>
          <option value="@aol.com">@aol.com</option>
          <option value="@msn.com">@msn.com</option>
          <option value="@yahoo.com">@yahoo.com</option>
        </select>
      </div>
      <input
        type="hidden"
        value={email}
        name="email"
      />
      <span className="input-requirements"><ExclamationCircleIcon width={15} />Minimum 5 characters, valid email address</span>
      <br />
      <Tooltip id="password-tooltip" anchorSelect="#password-label" effect="solid"/>
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
          style={{width: "100%"}}
          aria-label="Password"
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
      <span className="input-requirements" id="password-requirements"><ExclamationCircleIcon width={15} />Minimum 5 characters, at least one uppercase, one lowercase, and one number</span>
      <br />
      <Tooltip id="confirm-password-tooltip" anchorSelect="#confirm-password-label"/>
      <label
        id="confirm-password-label"
        data-tooltip-id="confirm-password-tooltip"
        data-tooltip-content="Confirm your password"
        data-tooltip-place="top-start">Confirm Password</label>
      <input
        autoComplete="new-password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Confirm your password"
        className="confirm-password-input"
        onChange={(e) => { setPasswordConfirmation(e.target.value) }}
        value={passwordConfirmation}
        aria-label="Confirm Password"
      />
      <span className="input-requirements" id="confirm-password-requirements"><ExclamationCircleIcon width={15} />Match password</span>
      <br />
      <Tooltip id="password-strength-tooltip" anchorSelect="#password-strength-label"/>
      <label
        id="password-strength-label"
        data-tooltip-id="password-strength-tooltip"
        data-tooltip-content="Password strength based on requirements"
        data-tooltip-place="top-start">Password Strength</label>
      <PasswordStrengthBar password={password} style={{ marginTop: "20px" }} />
      
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
                  <span>Sign Up</span>
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
  );
};

export default SignUpForm;
