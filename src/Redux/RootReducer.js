import {combineReducers} from 'redux';
import ExpenseIncomeReducer from './ExpenseIncome/ExpenseIncome.reducer';


const rootReducer=combineReducers({
    expenseIncome:ExpenseIncomeReducer
});

export default rootReducer;
