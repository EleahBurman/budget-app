import express from 'express'

import budgetRouter from "./budgetRoutes.js";
import expenseRouter from "./expenseRoutes.js";
import userRouter from "./userRoutes.js";
import { decodeCookie } from '../middleware/decodeCookie.js';

const router = express.Router();

// # if req url begins with '/api/expenses'
router.use('/expenses', decodeCookie, expenseRouter);

// # if req url begins with '/api/budgets'
router.use('/budgets', decodeCookie, budgetRouter);

// # if req url begins with '/api/users'
router.use('/users', userRouter);

export default router