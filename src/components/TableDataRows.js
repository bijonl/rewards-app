
function TableDataRows({transactionLog}) {
    if(transactionLog.length > 0) {
        return (
            <>
            {transactionLog.map(function(transaction, i) {
              return (
                <tr key={i}>
                  <td>{transaction.transactionDate}</td>
                  <td>{transaction.transactionAmount}</td>
                  <td>{transaction.transactionAmount}</td>
                </tr>
              )
            })}
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