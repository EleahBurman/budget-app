//assets
import { Form, NavLink} from "react-router-dom"

//library
import { TrashIcon } from '@heroicons/react/24/solid'

//asets
import threefriends from "../assets/three-friends.svg"

import { useNavigate } from "react-router-dom"


const Nav = ({ userName }) => {
  const navigate = useNavigate()
  const logOutUser=()=>{
    localStorage.removeItem('accessToken');
    navigate('/users/login')
  }
  return (
    <nav>
      <NavLink
        to="/"
        aria-label="Home"
      >
        <img src={threefriends} alt="" height={50} />
        <span>Budget Buddy</span>
      </NavLink>
      {
        userName && (
          <Form
            method="post"
            action="logout"
            onSubmit={(event) =>{
              if(!confirm("Delete user and all data?")){
                event.preventDefault()
              }
            }}
          >
            {/* <button 
              type="submit" 
              className="btn btn--warning">
              <span>Delete User</span>
              <TrashIcon width={20}/>
            </button> */}
            <button 
              type="button"
              onClick={logOutUser}
              className="btn btn--warning">
              <span>Logout</span>
              <TrashIcon width={20}/>
            </button>
          </Form>

        )
      }
    </nav>
  )
}

export default Nav