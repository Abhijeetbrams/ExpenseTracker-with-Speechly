
export const AddTransactionAction=(transaction)=>({
type:"ADD_TRANSACTION",
payload:transaction
});

export const DeleteTransactionAction=(transaction)=>({
    type:"DELETE_TRANSACTION",
    payload:transaction
});

export const GetBalanceAction=()=>({
    type:"GET_BALANCE"
});