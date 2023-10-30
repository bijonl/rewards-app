
import TableDataRows from './TableDataRows'; 

function MonthTables({monthsToDisplayArray, transactionLog}) {
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
                    filteredTransactionLog = {
                        transactionLog.filter((trans) => 
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