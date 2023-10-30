
function TableDataRows({filteredTransactionLog}) {
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
    if(filteredTransactionLog.length > 0) {
        return (
            <>
            {filteredTransactionLog.map(function(transaction, i) {
              return (
                <tr key={i}>
                  <td>{transaction.transactionDate}</td>
                  <td>${transaction.transactionAmount}</td>
                  <td>{calculateRewardPoints(transaction.transactionAmount)}</td>
                </tr>
              )
            })}
            <div>
                Total Monthly Points: {filteredTransactionLog.reduce((acc, obj) => acc + calculateRewardPoints(obj.transactionAmount), 0)}</div>
            </>
        );   
    } else {
        return (
            <>
                <div><h3>There are no transactions for this month</h3></div>
            </>
        )

    }
    
}; 

export default TableDataRows; 