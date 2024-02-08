//assets
import { Form, NavLink, useNavigate} from "react-router-dom"
//library
import { TrashIcon } from '@heroicons/react/24/solid'
import { toast } from "react-toastify";
//asets
import threefriends from "../assets/three-friends.svg"

import { useEffect, useState } from "react"



const Nav = ({ user}) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false)


  useEffect(()=>{
    if(!user.email){
      navigate("/users/signup")
    }
  },[])

  useEffect(()=>{
    if(user.email){
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }

  },[user])

  const handleLogout = async () => {

    if(confirm("Logout User?")) {
      localStorage.removeItem('accessToken');
      const result = await fetch("/api/users/logout");
      if (result.ok){
        navigate('/');
        toast.success(`Logged out ${user.name} successfully`)
      } else {
        console.error("Error logging out")
        toast.error("Error logging out")
      }
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    if(confirm("Are you sure you want to permanently delete this user?")) {

      const result = await fetch(`api/users/${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if(result){
        //redirect
        navigate('/');
      }
    }
  };

  return (
    <nav>

      <NavLink
        to="/"
        aria-label="Home"
      >
        <img src={threefriends} alt="" height={50} />
        <span>Budget Buddy</span>
      </NavLink>
      
      {loggedIn && 
        <div className="flex-sm">
          <button
              type="submit"
              className="btn"
              onClick={handleLogout}
          >
            Logout
          </button>
          <Form
            method="post"
            action="delete"
            onSubmit={handleDelete}
          >
            <button
              type="submit"
              className="btn"
            >
              Delete User
              <TrashIcon width={20} />
            </button>
          </Form>
        </div>
      }
        
    </nav>
  )
}

export default Nav