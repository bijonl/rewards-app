
import TableDataRows from './TableDataRows'; 

function MonthTables({monthsToDisplayArray, transactionLog}) {
    // Loop though the months to create the tables. The array has store the timestamps of the days. 
    const tables = monthsToDisplayArray.map((date, i) => 
        <>
            <h2>{date.toLocaleString('default', { month: 'long',   year: "numeric" })}</h2>
            <table>
            <tbody>
                <tr>
                    <th>Date</th>
                    <th>Transaction Dollar Amount</th>
                    <th>Transaction Points Amount</th>
                </tr>
                
                <TableDataRows 
                    filteredTransactionLog = { // Need to filter the transaction data to only get the transactions for the month in the loop. 
                        transactionLog.filter((trans) => 
                        // Compared Month and Year of timestamp in the loop to Transaction Date month and year. 
                        date.toLocaleString('default', { month: 'long', year: 'numeric'}) == new Date(trans.transactionDate).toLocaleString('default', { month: 'long',   year: 'numeric'}))
                    } 
                />
            </tbody>
            </table>
        </>
    ); 

    return (
        <>
            {tables}
        </>
    ); 
}

export default MonthTables; 