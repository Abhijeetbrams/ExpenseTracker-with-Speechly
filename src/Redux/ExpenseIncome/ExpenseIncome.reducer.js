import {addTransaction,deleteTransaction} from './ExpenseIncomeUtil';

const intial_state={
    expense_income:[]
}

const ExpenseIncomeReducer=(state=intial_state,action)=>{
    switch(action.type)
    {
    case "ADD_TRANSACTION":
        return  {
            ...state,
           expense_income:addTransaction(state.expense_income,action.payload)
        }  
    case "DELETE_TRANSACTION":
        return{
            ...state,
            expense_income:deleteTransaction(state.expense_income,action.payload)
        }
    default:
        return state;
    }
}

export default ExpenseIncomeReducer;