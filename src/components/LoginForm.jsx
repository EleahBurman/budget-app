import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef()
  const focusRef = useRef()
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
    setTimeout(async () => {
      const response = await fetch ('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
      })
  
      setIsSubmitting(false);
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
    }, 1500);
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      ref={formRef}>
      
      <label className="singup-label" >Email</label>
      <input type="text" className="email-input" onChange={(e)=>{setEmail(e.target.value)}} value={email} ref={focusRef}></input>
      <label className="singup-label">Password</label>
      <input type="text" className="password-input" onChange={(e)=>{setPassword(e.target.value)}} value={password}></input>
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