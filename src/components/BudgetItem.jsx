//rrd imports
import {Form, Link, useNavigate } from "react-router-dom"

//react imports
import { useState } from "react";

//component import
import ExpensePieChart from "../components/ExpensePieChart";

//library imports
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/outline";

//helper functions
import { formatCurrency, formatPercentages, customStyles } from "../helpers";
import { toast } from "react-toastify";
import Modal from 'react-modal';


const BudgetItem = ({budget, expenses, showDelete, showChart}) => {
  const navigate = useNavigate();
  const {_id, name, amount, totalSpent} = budget;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async (event) => {
    event.preventDefault();
    const result = await fetch(`/api/budgets/${budget._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (result.ok){
      navigate('/');
      toast.success(`User ${budget.name} deleted successfully`);
    } else {
      const errorData = await result.text();
      console.error("Error deleting budget item:", errorData);
      toast.error("Error deleting budget item");
    }
    setShowDeleteModal(false);
  };

  return (
    <div 
      className="budget"
      style={{
        "--accent": budget.color
      }}
    >
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{ formatCurrency(amount) } Budgeted</p>
      </div>
      <progress max={amount} value={totalSpent}>
        {formatPercentages(totalSpent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(totalSpent)} Total Spent</small>
        <small>{formatCurrency(amount - totalSpent)} Remaining</small>
      </div>
      {
        showDelete ? (
          <div className="flex-sm">
            <button
              type="submit"
              className="btn"
              onClick={() => setShowDeleteModal(true)}
            >
              <span
                style={{marginRight:"10px"}}>Delete Budget</span>
              <TrashIcon width={20} />
            </button>
            <ExpensePieChart expenses={expenses} />
          
            <Modal
              isOpen={showDeleteModal}
              onRequestClose={() => setShowDeleteModal(false)}
              style={customStyles}
              contentLabel="Delete Budget Item Modal"
            >
              <h2 style={{fontSize: "30px", color: "#1bbbc3"}}>Confirm Delete Budget</h2>
              <p style={{marginBottom: "10px" }}>Are you sure you want to permanently delete <span style={{fontWeight: "bold", color: "#1bbbc3"}}>{budget.name}</span>?</p>
              <Form
                onSubmit={handleDelete}
                method="post"
                action="delete">
                <div className="button-container">
                  <button type="submit" className="btn btn--dark"  style={{marginRight: "10px"}}>
                    Delete 
                    <TrashIcon width={20} />
                  </button>
                  <button type="button" className="btn btn--dark" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                  </button>
                </div>
              </Form>
            </Modal>
        </div>
        ) : (
          <div className="flex-sm">
            <Link
              to={`/budget/${_id}`}
              className="btn"
              >
              <span
                style={{marginRight: "10px"}}>View Details</span>
              <BanknotesIcon width={20} />
            </Link>

            <button
              type="submit"
              className="btn"
              onClick={() => setShowDeleteModal(true)}
            >
              <span
                style={{marginRight:"10px"}}>Delete Budget</span>
              <TrashIcon width={20} />
            </button>
          
            <Modal
              isOpen={showDeleteModal}
              onRequestClose={() => setShowDeleteModal(false)}
              style={customStyles}
              contentLabel="Delete Budget Item Modal"
            >
              <h2 style={{fontSize: "30px", color: "#1bbbc3"}}>Confirm Delete Budget</h2>
              <p style={{marginBottom: "10px" }}>Are you sure you want to permanently delete <span style={{fontWeight: "bold", color: "#1bbbc3"}}>{budget.name}</span>?</p>
              <Form
                onSubmit={handleDelete}
                method="post"
                action="delete">
                <div className="button-container">
                  <button type="submit" className="btn btn--dark"  style={{marginRight: "10px"}}>
                    Delete 
                    <TrashIcon width={20} />
                  </button>
                  <button type="button" className="btn btn--dark" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                  </button>
                </div>
              </Form>
            </Modal>

            {showChart && <ExpensePieChart expenses={expenses} />}


          </div>
        )
      }
    </div>
  )
}

export default BudgetItem