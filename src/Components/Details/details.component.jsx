import React,{useEffect} from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';

import useStyles from './styles';
//This is basically acts as a hooks like as in React and we're importing the
//style component created as styles.js we're importing and uses it as hooks.
//import useTransactions from '../../useTransactions';
import { incomeCategories, expenseCategories, resetCategories } from '../../Constants/categories';

import {connect} from 'react-redux';
import { CodeSharp } from '@material-ui/icons';
import {GetBalanceAction} from '../../Redux/ExpenseIncome/ExpenseIncomeAction';

const DetailsCard = ({ title, subheader,transactions,getBalance }) => {

   /* const transaction=[{
       title:"Income",
       Category:"Business",
       Amount:50,
       Date:"17.12.2020"
    },
    {
        title:"Expense",
        Category:"Bills",
        Amount:50,
        Date:"17.12.2020"
     }]
    let updateTrans=transactions?transactions:transaction;*/
    useEffect(()=>{
        getBalance();
    },[JSON.stringify(transactions)])

    const useTransactions = () => {
        resetCategories();
        const rightTransactions = transactions.filter((t) => t.type === title);
        const total = rightTransactions.reduce((acc, currVal) => acc += currVal.amount, 0);
        const categories = title === 'Income' ? incomeCategories : expenseCategories;
      
        rightTransactions.forEach((t) => {
          const category = categories.find((c) => c.type === t.category);
      
          if (category) category.amount += t.amount;
        });
      
        const filteredCategories = categories.filter((sc) => sc.amount > 0);
      
        const chartData = {
          datasets: [{
            data: filteredCategories.map((c) => c.amount),
            backgroundColor: filteredCategories.map((c) => c.color),
          }],
          labels: filteredCategories.map((c) => c.type),
        };
        console.log(rightTransactions);
      
        return { filteredCategories, total, chartData };
      };
      
  const { total, chartData } = useTransactions(title);
  //Getting value from the Material UI hook.
  const classes = useStyles();

  return (
      //Creating Cards and here we're using Material UI which provide styles 
      // form of Components Card - Card , Card Header - Heading of Card
      // typography - text inside the card. Doughnut - Doughtnut Chart.
      
    <Card className={title === 'Income' ? classes.income : classes.expense}>
      <CardHeader title={title} subheader={subheader} />
      <CardContent>
        <Typography variant="h5">${total}</Typography>
         <Doughnut data={chartData} />
      </CardContent>
    </Card>
  )
};


const mapStateToProps=(state)=>({
    transactions:state.expenseIncome.expense_income
})
const mapDispatchToProps=(dispatch)=>({
    getBalance:()=>dispatch(GetBalanceAction())
});

export default connect(mapStateToProps,mapDispatchToProps)(DetailsCard);

