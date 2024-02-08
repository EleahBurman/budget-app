//react imports
import { useState, useEffect } from "react";
//rrd imports
import { Form, NavLink, useNavigate } from "react-router-dom";
//hero icons imports
import { TrashIcon } from '@heroicons/react/24/solid';
//toastify imports
import { toast } from "react-toastify";
//modal imports
import Modal from 'react-modal';
//svg imports
import threefriends from "../assets/three-friends.svg";
//helpers imports
import { customStyles } from "../helpers";

const Nav = ({ user }) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (!user.email) {
      navigate("/users/signup");
    }
  }, []);

  useEffect(() => {
    if (user.email) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user]);

  const handleLogout = async () => {
    localStorage.removeItem('accessToken');
    const result = await fetch("/api/users/logout");
    if (result.ok){
      navigate('/');
      toast.success(`Logged out ${user.name} successfully`);
    } else {
      console.error("Error logging out");
      toast.error("Error logging out");
    }
    setShowLogoutModal(false);
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    const result = await fetch(`api/users/${user._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.ok){
      navigate('/');
      toast.success(`User ${user.name} deleted successfully`);
    } else {
      console.error("Error deleting user");
      toast.error("Error deleting user");
    }
    setShowDeleteModal(false);
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
              type="button"
              className="btn"
              onClick={() => setShowLogoutModal(true)}
          >
            Logout
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete User
            <TrashIcon width={20} />
          </button>
        </div>
      }

      {/* Logout Modal */}
      <Modal
        isOpen={showLogoutModal}
        onRequestClose={() => setShowLogoutModal(false)}
        style={customStyles}
        contentLabel="Logout Modal"
      >
        <h2 style={{fontSize: "30px", color: "#1bbbc3"}}>Confirm Logout</h2>
        <p style={{marginBottom: "10px" }}>Are you sure you want to logout, <span style={{fontWeight: "bold", color: "#1bbbc3"}}>{user.name}</span>?</p>
        <div className="button-container">
          <button className="btn btn--dark" onClick={handleLogout} style={{marginRight: "10px"}}>Logout</button>
          <button className="btn btn--dark" onClick={() => setShowLogoutModal(false)}>Cancel</button>
        </div>
      </Modal>

      {/* Delete User Modal */}
      <Modal
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
        style={customStyles}
        contentLabel="Delete User Modal"
      >
        <h2 style={{fontSize: "30px", color: "#1bbbc3"}}>Confirm Delete User</h2>
        <p style={{marginBottom: "10px" }}>Are you sure you want to permanently delete <span style={{fontWeight: "bold", color: "#1bbbc3"}}>{user.name}</span>?</p>
        <Form 
          onSubmit={handleDelete}
          method="post"
          action="delete">
          <div className="button-container">
            <button type="submit" className="btn btn--dark" style={{marginRight: "10px"}}>
              Delete 
              <TrashIcon width={20} />
            </button>
            <button type="button" className="btn btn--dark" onClick={() => setShowDeleteModal(false)}>
            Cancel
            </button>
          </div>
        </Form>
      </Modal>

    </nav>
  );
};

export default Nav;
