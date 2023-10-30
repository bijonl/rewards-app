
function TableDataRows({filteredTransactionLog}) {
    // Calculate Rewards Points Function
    const calculateRewardPoints = function(dollars) {
        let points = 0; 
        if(dollars >= 50) {
          if(dollars - 100 >= 0) {
            points += ((100 - 50)); 
            points += ((dollars - 100)*2); 
          } else {
            points += (dollars - 50); 
          }
        } 
        return points; 
    }

    if(filteredTransactionLog.length > 0) { // Check if it has any transactions
        return (
            <>
            {filteredTransactionLog.map(function(transaction, i) { // Map transactions to table rows
              return (
                <tr key={i}>
                  <td>{transaction.transactionDate}</td>
                  <td>${transaction.transactionAmount}</td>
                  <td>{calculateRewardPoints(transaction.transactionAmount)}</td>
                </tr>
              )
            })}
            <div>
                {/* Get Total using array reduce function */}
                Total Monthly Points: {filteredTransactionLog.reduce((acc, obj) => acc + calculateRewardPoints(obj.transactionAmount), 0)}</div>
            </>
        );   
    } else {
        return (
            // If there are no transactions. 
            <>
                <div><h3>There are no transactions for this month</h3></div>
            </>
        )

    }
    
}; 

export default TableDataRows; 