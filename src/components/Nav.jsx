//assets
import { Form, NavLink, useNavigate} from "react-router-dom"
//library
import { TrashIcon } from '@heroicons/react/24/solid'

//asets
import threefriends from "../assets/three-friends.svg"



const Nav = ({isLoggedIn, setIsLoggedIn}) => {
  
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    if(confirm("Logout User?")) {
      setIsLoggedIn(false);
      localStorage.removeItem('accessToken');
      navigate('/login');
    }
  };

  const handleDelete = (event) => {
    event.preventDefault();
    if(confirm("Are you sure you want to permanently delete this user?")) {
      setIsLoggedIn(false);
      localStorage.removeItem('accessToken');
      navigate('/login');
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
      {isLoggedIn && (
        <div className="flex-sm">
          <Form
            method="post"
            action="logout"
            onSubmit={handleLogout}
          >
            <button
              type="submit"
              className="btn"
            >
              Logout
            </button>
          </Form>
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
      )}
    </nav>
  )
}

export default Nav