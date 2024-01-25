//react imports
import { useEffect, useState, useRef } from "react"

//rrd imports
import { useNavigate, useOutletContext } from "react-router-dom"


const LoginForm = () => {
  //get rid of global state and rely on cookie
  //not using setUser
  //logout button ( why is that missing - - route that deletes cookie)
  const [setUser] =  useOutletContext();
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
    //setTimeout(async () => {
      const response = await fetch ('/api/users/login', {
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