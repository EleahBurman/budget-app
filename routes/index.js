import express from 'express'

import budgetRouter from "./budgetRoutes.js";
import expenseRouter from "./expenseRoutes.js";
import userRouter from "./userRoutes.js";

const router = express.Router();

// # if req url begins with '/api/expenses'
router.use('/expenses', expenseRouter);

// # if req url begins with '/api/budgets'
router.use('/budgets', budgetRouter);

// # if req url begins with '/api/users'
router.use('/users', userRouter);

export default router