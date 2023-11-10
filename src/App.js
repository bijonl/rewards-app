import logo from './logo.svg';
import MonthTables from './components/MonthTables.js'
import './styles/Table.css';
import { useState } from 'react';
import { useEffect } from 'react';



function App() {

  const API_URL = 'http://localhost:3500/transactions';
  const [allTransactionData, setAllTransactionData] = useState([]); 
  const [monthsToDisplay, setMonthsToDisplay] = useState([]); 
  const [numberOfMonthsDisplayed, setnumberOfMonthsDisplayed] = useState(4); 

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(API_URL);
        const newData = await response.json();
        setAllTransactionData(newData);
      }
      fetchData(); 
  }, []);

  useEffect(() => {
    // Loops the number of months, gets the date and pushes it into the months to display Array. 
      for(let month = 0; month < numberOfMonthsDisplayed; month++) {
      let currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() - month);
      monthsToDisplay.push(currentDate); 
    }; 
  }, []);

  // const transactionTest =  {"id":1,"name":"Brook Moreton","username":"bmoreton0","customerID":"01HETARD7GEZSGCTDPA8PP8KPC","email":"bmoreton0@wp.com","transactionAmt":"$596.00","transactionDate":"2023-08-16T11:42:03Z"}; 
  // const testDate = new Date(transactionTest.transactionDate); 
  // console.log(testDate.toLocaleString('default', { month: 'long',   year: "numeric"})); 


  return (
    <div className="App">
        <h1>Person's Customer Rewards</h1>
        <MonthTables // Component for each month table
          allTransactionData = {allTransactionData}
          monthsToDisplay = {monthsToDisplay}
        />
    </div>
  );
}

export default App;
