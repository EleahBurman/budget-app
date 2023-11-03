import express from 'express'

import budgetRouter from "./budgetRoutes.js";
import expenseRouter from "./expenseRoutes.js";

const router = express.Router();

// # if req url begins with '/api/expenses'
router.use('/expenses', expenseRouter);

// # if req url begins with '/api/budgets'
router.use('/budgets', budgetRouter);

export default router