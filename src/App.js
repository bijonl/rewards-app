import React, { useState, useEffect, useMemo } from 'react'
import RewardTable from './components/RewardTable.js'
import { formatDateToMonthYear, calculateRewardPoints } from './util/util.js'
import './App.css'

const API_URL = 'http://localhost:3500/transactions'
const NUMBER_OF_MONTHS_TO_DISPLAY = 3

// Returns an array of length 'numberOfMonths' of dates one month apart, in descending order starting with today .
function getMonthYearsToDisplay (numberOfMonths) {
  const monthYearsToDisplay = []
  for (let month = 0; month < numberOfMonths; month++) {
    const currentDate = new Date()
    currentDate.setMonth(currentDate.getMonth() - month)
    monthYearsToDisplay.push(formatDateToMonthYear(currentDate))
  }
  return monthYearsToDisplay
}

function App () {
  const [allTransactionData, setAllTransactionData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(API_URL)
      .then(response => response.json())
      .then(setAllTransactionData)
      .finally(() => setLoading(false))
  }, [])

  const monthYearsToDisplay = useMemo(() => getMonthYearsToDisplay(NUMBER_OF_MONTHS_TO_DISPLAY), [])

  const uniqueCustomerData = Object.create(null);

  console.log(allTransactionData); 
  allTransactionData.map((transaction) => {
    const date = formatDateToMonthYear(new Date(transaction.transactionDate)); 
    const formattedDateKey = date.replace(' ', '_').toLowerCase(); 

    if(uniqueCustomerData[transaction.username] === undefined) {
      // Customer is not there
      console.log('CUSTOMER NOT HERE'); 
      uniqueCustomerData[transaction.username] = {}; 
      uniqueCustomerData[transaction.username][formattedDateKey] = calculateRewardPoints(transaction.transactionAmount);
      console.log('------');
    } else {
      console.log('CUSTOMER IS THERE'); 
      if(uniqueCustomerData[transaction.username][formattedDateKey] !== undefined) {
        uniqueCustomerData[transaction.username][formattedDateKey] += calculateRewardPoints(transaction.transactionAmount);
      } else {
        uniqueCustomerData[transaction.username][formattedDateKey] = calculateRewardPoints(transaction.transactionAmount);
      }
  }
}); 

  console.log(uniqueCustomerData); 

  return (
    <div className="App">
      <h1>Customer Rewards Table</h1>
      <RewardTable
        loading={loading}
        allTransactionData={allTransactionData}
        monthYearsToDisplay={monthYearsToDisplay}
      />
    </div>
  )
}

export default App
