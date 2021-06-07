import {combineReducers} from 'redux';
import ExpenseIncomeReducer from './ExpenseIncome/ExpenseIncome.reducer';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';// defaults to localStorage for web


const persistConfig={
    key:"root", // this means at what point inside of our reducer object do we want to start storing everything and
     // we want to start from the root 
    storage,// storage or the type of storage we have imported 
    whitelist:['expenseIncome']// this contain the string name of any of the reducer we want to store
     // Here we have user and cart but as user reducer is already persisted with the Firebase so we only want cart reducer to store in
    // local storage and if we want to add any of the reducer again then we will pass inside this array with comma seperated.
  };
  
const rootReducer=combineReducers({
    expenseIncome:ExpenseIncomeReducer
});


export default persistReducer(persistConfig,rootReducer);
// Now we will get our Modified root reducer with persist config on the top of it.