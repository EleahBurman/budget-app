//react imports
import { useEffect, useState, useRef } from "react";

//rrd imports
import { useNavigate } from "react-router-dom";

//utility import
import { Tooltip } from 'react-tooltip';
import PasswordStrengthBar from 'react-password-strength-bar';

//library import
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

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
  const [customSuffix, setCustomSuffix] = useState("");
  const [isOtherSelected, setIsOtherSelected] = useState(false);
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
  
        console.error(body, body.message);
  
        if (body.message) {
          toast.error(`${body.message}`);
        } else if(body.errors){
          toast.error(`${body.errors}`);
        } else{
          toast.error("An error occurred during signup. Please try again.");
        }
      } catch (error) {
        console.error(error);
        toast.error(`${error} An error occurred occurred during signup. Please try again. `);
      }
  
      return;
    }

    navigate('/');

    setIsSubmitting(false);
  };

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
      ref={formRef}
    >
      <Tooltip id="username-tooltip" anchorSelect="#username-label" effect="solid"/>
      <label
        id="username-label"
        data-tooltip-id="username-tooltip" 
        data-tooltip-content="Minimum 5 characters, maximum 20 characters, and unique username"
        data-tooltip-place="top-end">Username</label>
      <input
        type="text"
        className="username-input"
        placeholder="Enter your username"
        onChange={(e) => { setUsername(e.target.value) }} value={username} ref={focusRef}
        aria-label="Username"
      />
      <Tooltip id="email-tooltip" anchorSelect="#email-label" effect="solid"/>
      <label
        id="email-label"
        data-tooltip-id="email-tooltip"
        data-tooltip-content="Minimum 5 characters, valid email address, and unique email address"
        data-tooltip-place="top-end">Email</label>
      <div style={{ display: 'flex', gap: '10px' }}>
      <input
        type="text"
        placeholder="Enter your email"
        onChange={(e) => setEmailPrefix(e.target.value)}
        value={emailPrefix}
        aria-label="Email"
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
      <inputls
        type="hidden"
        value={email}
        name="email"
      />
      <Tooltip id="password-tooltip" anchorSelect="#password-label" effect="solid"/>
      <label
        id="password-label"
        data-tooltip-id="password-tooltip"
        data-tooltip-content="Minimum 5 characters, at least one uppercase, one lowercase, one number, and one symbol"
        data-tooltip-place="top-end">Password</label>
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
      <Tooltip id="confirm-password-tooltip" anchorSelect="#confirm-password-label"/>
      <label
        id="confirm-password-label"
        data-tooltip-id="confirm-password-tooltip"
        data-tooltip-content="Match your password"
        data-tooltip-place="top-end">Confirm</label>
      <input
        autoComplete="new-password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Confirm your password"
        className="confirm-password-input"
        onChange={(e) => { setPasswordConfirmation(e.target.value) }}
        value={passwordConfirmation}
        aria-label="Confirm Password"
      />
      <Tooltip id="password-strength-tooltip" anchorSelect="#password-strength-label"/>
      <label
        id="password-strength-label"
        data-tooltip-id="password-strength-tooltip"
        data-tooltip-content="Password strength based on requirements"
        data-tooltip-place="top-end">Strength</label>
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
        &nbsp;
        &nbsp;
        <label 
          style={{alignSelf: "flex-start" }}
          id="remember-me-label">
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
