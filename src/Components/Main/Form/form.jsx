import React, { useState, useEffect } from 'react';
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

import { useSpeechContext } from '@speechly/react-client';
import CustomizedSnackbar from '../../Snackbar/snackbar';
import formatDate from '../../../Utils/formatDate';
import { incomeCategories, expenseCategories } from '../../../Constants/categories';
import useStyles from './styles';
import {connect} from 'react-redux';
import {AddTransactionAction,GetBalanceAction} from '../../../Redux/ExpenseIncome/ExpenseIncomeAction';


const initialState = {
  amount: '',
  category: '',
  type: 'Income',
  date: formatDate(new Date()),
};

const NewTransactionForm = ({addTransaction}) => {
  const classes = useStyles();
 // const { addTransaction } = useContext(ExpenseTrackerContext);
  const [formData, setFormData] = useState(initialState);
  const { segment } = useSpeechContext();
  const [open, setOpen] = useState(false);

  const createTransaction = () => {
    if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;

    if (incomeCategories.map((iC) => iC.type).includes(formData.category)) {
      setFormData({ ...formData, type: 'Income' });
    } else if (expenseCategories.map((iC) => iC.type).includes(formData.category)) {
      setFormData({ ...formData, type: 'Expense' });
    }

    if (formData.amount && formData.category && formData.type && formData.date) {
    setOpen(true);
    addTransaction({ ...formData, amount: Number(formData.amount), id: uuidv4() });
    }
    setFormData(initialState);
  };


  // Adding segment as an dependency array because whenever it's changed we need
  // to run the logic as we have declared intents in the Speechly configuration
  // and on the basis of that will update the Form Data.
  useEffect(() => {
    
    if (segment) {
      if (segment.intent.intent === 'add_expense') {
        setFormData({ ...formData, type: 'Expense' });
      } else if (segment.intent.intent === 'add_income') {
        setFormData({ ...formData, type: 'Income' });
      } else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
        return createTransaction();
      } else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
        return setFormData(initialState);
      }

      segment.entities.forEach((s) => {
        const category = `${s.value.charAt(0)}${s.value.slice(1).toLowerCase()}`;
// As while speaking it converts the category to word as a capital and to handle
// this we'll change this into small letter and 1st letters as capital.
        switch (s.type) {
// Now as we defined the variables as Entity in the SAL configuration of Speechly
// So, whenever Speechly converts speech to word it'll map the correponding
// Entity and here we're fetching these entities and update the formData. 
          case 'amount':
            setFormData({ ...formData, amount: s.value });
            break;
          case 'category':
// To check suppose User says Income as a type but says Category as Travel which
// is not basically belongs to this type so thus we're changing the value
// of Type on the basis of Category.
            if (incomeCategories.map((iC) => iC.type).includes(category)) {
              setFormData({ ...formData, type: 'Income', category });
            } else if (expenseCategories.map((iC) => iC.type).includes(category)) {
              setFormData({ ...formData, type: 'Expense', category });
            }
            break;
          case 'date':
            setFormData({ ...formData, date: s.value });
            break;
          default:
            break;
        }
      });
// segment.isFinal - When we completed our speech and paused for long time and checking all the
// data in the form is filled or the whole formData is updated from speech.
      if (segment.isFinal && formData.amount && formData.category && formData.type && formData.date) {
        createTransaction();
      }
    }
  }, [segment]);

// 
  const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;

  return (
    <Grid container spacing={2}>
      <CustomizedSnackbar open={open} setOpen={setOpen} />
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
        {segment ? (
        <div className="segment">
          {segment.words.map((w) => w.value).join(" ")}
        </div>
      ) : null}
         {/* {isSpeaking ? <BigTranscript /> : 'Start adding transactions'}  */}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          { /* here we're setting the formData if we put values in the form manually */ }
          <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
            {selectedCategories.map((c) => <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <TextField type="number" label="Amount" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} fullWidth />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="Date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value) })} />
      </Grid>
      <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
    </Grid>
  );
};

const mapDispatchToProps=(dispatch)=>({
addTransaction:transaction=>dispatch(AddTransactionAction(transaction))
});

export default connect(null,mapDispatchToProps)(NewTransactionForm);