import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip';
import PasswordStrengthBar from 'react-password-strength-bar';
import { ExclamationCircleIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";


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
  const [email, setEmail] = useState('');
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
      const body = await response.text();
      console.error(body);
      return;
    }
    navigate('/');

    setIsSubmitting(false);

    console.log("Keep me logged in:", keepLoggedIn);
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
      <input
        type="text"
        className="email-input"
        placeholder="Enter your email"
        onChange={(e) => { setEmail(e.target.value) }}
        value={email}
        aria-label="Email"
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
      <span className="input-requirements"><ExclamationCircleIcon width={15} />Minimum 5 characters, at least one uppercase, one lowercase, and one number</span>
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
      <span className="input-requirements"><ExclamationCircleIcon width={15} />Match password</span>
      <br />
      <Tooltip id="password-strength-tooltip" anchorSelect="#password-strength-label"/>
      <label
        id="password-strength-label"
        data-tooltip-id="password-strength-tooltip"
        data-tooltip-content="Password strength based on requirements"
        data-tooltip-place="top-start">Password Strength</label>
      <PasswordStrengthBar password={password} style={{ marginTop: "20px" }} />

      

      <label>
        Remember Me
        &nbsp; <input
          type="checkbox"
          checked={keepLoggedIn}
          onChange={() => setKeepLoggedIn(!keepLoggedIn)}
          style={{ width: "auto", cursor: "pointer" }}
        />
      </label>

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
    </form>
  );
};

export default SignUpForm;
