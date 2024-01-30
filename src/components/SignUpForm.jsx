import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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

    const body = await response.json();
    console.log(body, "is this line 32");
    navigate('/');

    setIsSubmitting(false); // Added to reset isSubmitting after submission

    console.log("Keep me logged in:", keepLoggedIn);
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <label className="signup-label">Username</label>
      <input
        type="text"
        className="username-input"
        placeholder="Enter your username"
        onChange={(e) => { setUsername(e.target.value) }} value={username} ref={focusRef}
        aria-label="Username"
      />
      <span className="input-requirements"><ExclamationCircleIcon width={15} />Minimum 5 characters, maximum 20 characters</span>
      <br />
      <label className="signup-label">Email</label>
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
      <label className="signup-label">Password</label>
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
      <label className="signup-label">Confirm Password</label>
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

      <label className="signup-label">Password Strength</label>
      <PasswordStrengthBar password={password} style={{ marginTop: "20px" }} />

      <label>
        Show Password
        &nbsp; <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
          style={{ width: "auto", cursor: "pointer" }}
        />
      </label>

      <label>
        &nbsp; Remember Me
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
