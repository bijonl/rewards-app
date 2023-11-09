import logo from './logo.svg';
import MonthTables from './components/MonthTables.js'
import './styles/Table.css';
import transactionLog from './TransactionData.js'; // All the transaction data

function App() {

  // Determines which months needs to be displayed
  const API_URL = 'http://localhost:3500/transactions'; 

  const monthsToDisplayArray = []; // initialize array to store the months that need to be displayed. 
  const numberOfMonthsDisplayed = 3; // This variable says show 3 months -- the current month and 2 before it. 
  
  // Loops the number of months, gets the date and pushes it into the months to display Array. 
  for(let m = 0; m < numberOfMonthsDisplayed; m++) {
    let currentDate = new Date();
    let currentDateCopy = currentDate; 
    currentDateCopy.setMonth(currentDateCopy.getMonth() - m);
    monthsToDisplayArray.push(currentDateCopy); 
  }; 

  const fetchItems = async () => {
    const response = await fetch(API_URL); 
    const listItems = await response.json(); 
  }

  fetchItems(); 



  return (
    <div className="App">
        <h1>Person's Customer Rewards</h1>
        <MonthTables // Component for each month table
          monthsToDisplayArray = {monthsToDisplayArray}
          transactionLog = {transactionLog}
        />
    </div>
  );
}

export default App;
