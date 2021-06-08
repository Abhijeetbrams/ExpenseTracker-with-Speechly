

export const addTransaction=(expense_income,transaction)=>{
  return [...expense_income,transaction]   
}

export const deleteTransaction=(expense_income,transaction)=>{
     return expense_income.filter((expense)=>expense.id!==transaction.id);
}

export const calculateBalance=(expense_income)=>{
    let Income =parseInt(0);
    let Expense=parseInt(0);

    for(var i=0;i<expense_income.length;i++)
    {
       console.log(expense_income[i]);
        if(expense_income[i].type==="Income")
        {
            Income=parseInt(Income)+parseInt(expense_income[i].amount);
            
        }
        else
        {
            Expense=parseInt(Expense)+parseInt(expense_income[i].amount);
        }
        console.log(expense_income[i].amount);
    }
    console.log(Income,Expense);
    return Income-Expense;
}