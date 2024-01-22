import express from 'express';


import {getCurrency, convertCurrency} from '../controllers/currencyController.js'


const currencyRouter = express.Router();

currencyRouter.route("/").get(getCurrency);

currencyRouter.route("/").post(convertCurrency);

export default currencyRouter;