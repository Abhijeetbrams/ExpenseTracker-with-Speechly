import {addTransaction,deleteTransaction,calculateBalance} from './ExpenseIncomeUtil';

const intial_state={
    expense_income:[],
    balance:parseInt(0)
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
    case "GET_BALANCE":
        return{
            ...state,
          balance:parseInt(calculateBalance(state.expense_income))
        }
    default:
        return state;
    }
}

export default ExpenseIncomeReducer;