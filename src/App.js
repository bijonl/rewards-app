import React, { useState, useEffect, useMemo } from 'react'
import RewardTable from './components/RewardTable.js'
import './App.css'

const API_URL = 'http://localhost:3500/transactions'
const NUMBER_OF_MONTHS_TO_DISPLAY = 3

// Returns an array of length 'numberOfMonths' of dates one month apart, in descending order starting with today .
function getMonthsToDisplay (numberOfMonths) {
  const monthsToDisplay = []
  for (let month = 0; month < numberOfMonths; month++) {
    const currentDate = new Date()
    currentDate.setMonth(currentDate.getMonth() - month)
    monthsToDisplay.push(currentDate)
  }
  return monthsToDisplay
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

  const monthsToDisplay = useMemo(() => getMonthsToDisplay(NUMBER_OF_MONTHS_TO_DISPLAY), [])

  return (
    <div className="App">
      <h1>Customer Rewards Table</h1>
      <RewardTable // Component for each month table
        loading={loading}
        allTransactionData={allTransactionData}
        monthsToDisplay={monthsToDisplay}
      />
    </div>
  )
}

export default App
