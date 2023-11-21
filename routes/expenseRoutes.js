import express from 'express';
import { getExpenses, createExpense, getExpenseById, deleteExpense } from '../controllers/expenseControllers.js';

const expenseRouter = express.Router();

expenseRouter
  .route("/")
  .get(getExpenses)
  .post(createExpense);

expenseRouter.route("/:expenseId")
  .get(getExpenseById)
  .delete(deleteExpense);

export default expenseRouter;