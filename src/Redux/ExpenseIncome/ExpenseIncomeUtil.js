

export const addTransaction=(expense_income,transaction)=>{
  return [...expense_income,transaction]   
}

export const deleteTransaction=(expense_income,transaction)=>{
     return expense_income.filter((expense)=>expense.id!==transaction.id);
}