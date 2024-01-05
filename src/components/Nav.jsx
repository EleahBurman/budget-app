//assets
import { Form, NavLink, useNavigate} from "react-router-dom"
//library
import { TrashIcon } from '@heroicons/react/24/solid'

//asets
import threefriends from "../assets/three-friends.svg"

import { deleteItem } from "../helpers"



const Nav = ({isLoggedIn, setIsLoggedIn, userName, user}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    //event.preventDefault();
    if(confirm("Logout User?")) {
      //setIsLoggedIn(false);

      localStorage.removeItem('accessToken');
      const result = await fetch("/api/users/logout");
      console.log("handle logout",result);


      navigate('/');
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();

    console.log("nav user", user)
    if(confirm("Are you sure you want to permanently delete this user?")) {

      const result = await fetch(`api/users/${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
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
      
      {user.email && 
        <div className="flex-sm">
          {/*<Form*/}
          {/*  method="post"*/}
          {/*  action="logout"*/}
          {/*  onSubmit={handleLogout}*/}
          {/*>*/}
          {/*  <button*/}
          {/*    type="submit"*/}
          {/*    className="btn"*/}
          {/*  >*/}
          {/*    Logout*/}
          {/*  </button>*/}
          {/*</Form>*/}
          
          
          
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