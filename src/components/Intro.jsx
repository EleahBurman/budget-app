import { Form } from "react-router-dom"

//library
import { UserPlusIcon } from "@heroicons/react/24/solid"

//assets
import illustration from "../assets/illustration.jpg"

//rrd imports
import { useFetcher } from "react-router-dom"

//react imports
import { useEffect, useRef } from "react"


const Intro = () => {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === "submitting";
  const formRef = useRef()
  const focusRef = useRef()

  useEffect(()=>{
    if(!isSubmitting){
      //clear form
      formRef.current.reset()
      //reset focus
      focusRef.current.focus()
    }

  }, [isSubmitting])

  return (
    <div className="intro">
      <div>
        <h1>
          Take Control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal budgeting is the secret to financial freedom. Start your journey today.
        </p>
        <fetcher.Form 
          method="post"
          ref={formRef}
        >
          <input 
            type="text" 
            name="userName" 
            placeholder="What is your name?" aria-label="Your Name" 
            autoComplete="given-name"
            ref={focusRef}
            required />
          <input
            type="hidden"
            name="_action"
            value="newUser"
          />
          <button
            type="submit"
            className="btn btn--dark"
            disabled={isSubmitting}
          >
            {
            isSubmitting ?
            <span>Submitting...</span>:
              (
                <>
                  <span>Create Account</span>
                  <UserPlusIcon width={20} />
                </>
              )
            }
          </button>
        </fetcher.Form>
      </div>
      <img src={illustration} alt="Person with money" width={600}/>
    </div>
  )
}

export default Intro