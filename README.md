# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Speechly Playground Deployed Model - https://api.speechly.com/dashboard/#/playground/41ab98a3-6d98-4812-b2ae-fa1f44cf83b1?language=en-US

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


**Speechly Configuration-**
category_income = [
    Business
    Investments
    Extra income
    Deposits
    Lottery
    Gifts
    Salary
    Savings
    Rental income
]
category_expense = [
    Bills
    Car
    Clothes
    Travel
    Food
    Shopping
    House
    Entertainment
    Phone
    Pets
    Other
]
*create_transaction [Create|Finish|Save] {transaction}
*cancel_transaction [Cancel|Delete|Remove|Clear] {transaction}
*add_category [Set|Change] category {to} [$category_expense|$category_income](category)
*add_category {[i mean|i meant|i said]} {the} ![category {[is|of]} | [$category_expense|$category_income](category)]
*add_date [Set|Change|Add] date {[to|for]} $SPEECHLY.DATE(date)
*add_date {[i mean|i meant|i said]} {[{the} date is|for]} $SPEECHLY.DATE(date)
*add_amount [Set|Change] amount {to} $SPEECHLY.NUMBER(amount) {dollars}
*add_amount {[i mean|i meant|i said]} {{the} amount {[is|of]}} $SPEECHLY.NUMBER(amount) {dollars}
*add_expense {Add} {an} expense ![{[for|of]} $SPEECHLY.NUMBER(amount) {dollars} | {in} | {category} | [$category_expense|$category_income](category) | {[for|in]} $SPEECHLY.DATE(date)]
*add_expense $SPEECHLY.NUMBER(amount) {[dollar|dollars]} expense {in} ![{category} | [$category_expense|$category_income](category)] {[for|in]} $SPEECHLY.DATE(date)
*add_income {Add} {[{an} income|{a} balance]} ![{[for|of]} $SPEECHLY.NUMBER(amount) {dollars} | {in} | {category} | [$category_expense|$category_income](category) | {[for|in]} $SPEECHLY.DATE(date)]
*add_income $SPEECHLY.NUMBER(amount) {[dollar|dollars]} [income|balance] {in} ![{category} | [$category_expense|$category_income](category)] {[for|in]} $SPEECHLY.DATE(date)

**Step for Configuring in the React App -**
1. Like Redux and Context Speechly has it's own Provider that will wrap the whole App with Speechly Provider.
2. Place PushToTalk Button and Container in the App.
- 
import { PushToTalkButton, PushToTalkButtonContainer } from '@speechly/react-ui';

        <PushToTalkButtonContainer>
          <PushToTalkButton />
        </PushToTalkButtonContainer>
3. Adding a Transcript to what we're saying.
- 
import { SpeechState, useSpeechContext } from "@speechly/react-client";

  const { speechState } = useSpeechContext(); // from that Speech context we'll get Speech State
  
  and Rest mentioned as comments in the Code.




