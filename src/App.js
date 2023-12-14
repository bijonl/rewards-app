import React, { useState, useEffect, useMemo } from 'react'
import RewardTable from './components/RewardTable.js'
import { formatDateToMonthYear } from './util/util.js'
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
