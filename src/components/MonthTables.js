function MonthTables({ monthsToDisplay, allTransactionData, loading }) {
  // Loop though the months to create the tables. The array has store the timestamps of the days.

  function calculateRewardPoints(dollars) {
    let points = 0;
    if (dollars >= 50) {
      if (dollars - 100 >= 0) {
        points += ((100 - 50));
        points += ((dollars - 100) * 2);
      } else {
        points += (dollars - 50);
      }
    }
    return points;
  }

  // Function to Return points is date, dataset, and customer ID are provided
  function getPointsPerMonthByID(data, date, ID) {
    // Filters Data array to transactions that month
    const filteredTransactionsByMonth = data.filter((transaction) => date.toLocaleString('default', { month: 'long', year: 'numeric' }) == new Date(transaction.transactionDate).toLocaleString('default', { month: 'long', year: 'numeric' }));
    // Filters the Data Array for that month to specific Customer ID
    const filteredMonthlyTransactionsByID = filteredTransactionsByMonth.filter((transaction) => transaction.customerID == ID);
    // Map the transaction amounts, converts them to points
    const transactionPointAmountsMonthlyByID = filteredMonthlyTransactionsByID.map((transaction) => {
      const transactionAmtDollars = Math.floor(transaction.transactionAmt.replace(/[^0-9.-]+/g, ''));
      return calculateRewardPoints(transactionAmtDollars);
    });
    // Reduce them down to sum up the values. 
    const totalPoints = transactionPointAmountsMonthlyByID.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
    return totalPoints;
  }

  function getCustomerNameByID(transactionData, id) {
    let customerName = '';
    const transactionsWithID = transactionData.filter((transaction) => transaction.customerID == id);
    transactionsWithID.forEach((customer) => {
      customerName = customer.name;
    });
    return customerName;
  }
  // Take all data and get all unique IDs so that there are no repeat rows. 
  const uniqueCustomerIDs = ([...new Set(allTransactionData.map((element) => element.customerID))]);
  const monthHeaders = monthsToDisplay.map((date, i) => (
    <th key={i}>{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</th>
  ));
  // Map Unique Customers and get their data by Month
  const tableDataRows = uniqueCustomerIDs.map((customerID, i) => {
    const customerName = getCustomerNameByID(allTransactionData, customerID);
    const monthlyDataRows = monthsToDisplay.map((date, i) => (
      <td key={i}>{getPointsPerMonthByID(allTransactionData, date, customerID)}</td> // Creates data rows from above. 
    ));

    return (
      <tr>
        <td>
          {customerName}
        </td>
        {monthlyDataRows}
      </tr>
    );
  });
  // Check if it is finished loading before returning. 
  if (loading == false) {
    return (
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            {monthHeaders}
          </tr>
          {tableDataRows}
        </thead>

      </table>
    );
  }
  return (
    <div>Loading...</div>
  );
}

export default MonthTables;
