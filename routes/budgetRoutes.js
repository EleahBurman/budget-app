import express from 'express';
import { getBudgets, createBudget, getBudgetById, deleteBudget } from '../controllers/budgetControllers.js';

const budgetRouter = express.Router();

budgetRouter.route("/")
  .get(getBudgets)
  .post(createBudget);

budgetRouter.route("/:budgetId")
  .get(getBudgetById)
  .delete(deleteBudget);

export default budgetRouter;