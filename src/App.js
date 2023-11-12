import MonthTables from './components/MonthTables.js'
import './styles/Table.css'
import { useState, useEffect } from 'react'

function App () {
  const API_URL = 'http://localhost:3500/transactions'
  const [allTransactionData, setAllTransactionData] = useState([])
  const [monthsToDisplay, setMonthsToDisplay] = useState([])
  const [numberOfMonthsDisplayed, setnumberOfMonthsDisplayed] = useState(3)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await fetch(API_URL)
      const newData = await response.json()
      setAllTransactionData(newData)
      setLoading(false) // Stop loading
    }

    fetchData()
  }, [])

  useEffect(() => {
    // Loops the number of months, gets the date and pushes it into the months to display Array.
    for (let month = 0; month < numberOfMonthsDisplayed; month++) {
      const currentDate = new Date()
      currentDate.setMonth(currentDate.getMonth() - month)
      monthsToDisplay.push(currentDate)
    };
  }, [])

  return (
    <div className="App">
      <h1>Person's Customer Rewards</h1>
      <MonthTables // Component for each month table
        loading={loading}
        allTransactionData={allTransactionData}
        monthsToDisplay={monthsToDisplay}
      />
    </div>
  )
}

export default App
