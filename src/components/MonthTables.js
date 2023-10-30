
import TableDataRows from './TableDataRows'; 

function MonthTables({monthsToDisplayArray, transactionLog}) {
   
    const tables = monthsToDisplayArray.map((date, i) => 
        <>
            <h2>{date.toLocaleString('default', { month: 'long' })} {date.getUTCFullYear()}</h2>
            <table>
            <tbody>
                <tr>
                    <th>Date</th>
                    <th>Transaction Dollar Amount</th>
                    <th>Transaction Points Amount</th>
                </tr>
                
                <TableDataRows transactionLog = {transactionLog} />
                
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