import logo from './logo.svg';
import MonthTables from './components/MonthTables.js'
import './App.css';
import transactionLog from './TransactionData.js'; 

function App() {
  const monthsToDisplayArray = []; 
  for(let m = 0; m < 3; m++) {
    let currentDate = new Date();
    let currentDateCopy = currentDate; 
    currentDateCopy.setMonth(currentDateCopy.getMonth() - m);
    monthsToDisplayArray.push(currentDateCopy); 
  }; 

 

  return (
    <div className="App">
        <h1>Person's Customer Rewards</h1>
        <MonthTables 
          monthsToDisplayArray = {monthsToDisplayArray}
          transactionLog = {transactionLog}

        />
     
        
    </div>
  );
}

export default App;
