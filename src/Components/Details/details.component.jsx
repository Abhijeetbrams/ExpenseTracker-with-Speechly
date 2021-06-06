import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';

import useStyles from './styles';
//This is basically acts as a hooks like as in React and we're importing the
//style component created as styles.js we're importing and uses it as hooks.
import useTransactions from '../../useTransactions';

const DetailsCard = ({ title, subheader }) => {
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
        <Typography variant="h5">Total</Typography>
         <Doughnut data={chartData} />
      </CardContent>
    </Card>
  );
};

export default DetailsCard;

//