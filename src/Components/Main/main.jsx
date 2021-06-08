import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core';
import { useSpeechContext } from '@speechly/react-client';
import useStyles from './styles';
import  NewTransactionForm from './Form/form';
import List from './List/list';
import InfoCard from '../InfoCard';
import {connect} from 'react-redux';

const ExpenseTracker = ({balance}) => {
  const classes = useStyles();
 // const { balance } = useContext(ExpenseTrackerContext);
console.log(balance);
  return (
    <Card className={classes.root}>
      <CardHeader title="Expense Tracker" subheader="With Speechly,Redux,MaterialUI etc" />
      <CardContent>
        <Typography align="center" variant="h5">Total Balance ${balance}</Typography>
        <Typography variant="subtitle1" style={{ lineHeight: '1.5em', marginTop: '20px' }}>
          <InfoCard />
        </Typography>
        <Divider className={classes.divider} />
        <NewTransactionForm />
      </CardContent>
      <CardContent className={classes.cartContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const mapStateToProps=(state)=>({
    balance:state.expenseIncome.balance
})

export default connect(mapStateToProps)(ExpenseTracker);