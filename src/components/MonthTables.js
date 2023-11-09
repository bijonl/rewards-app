
// import TableDataRows from './TableDataRows'; 

function MonthTables({monthsToDisplayArray, transactionLog}) {
    // Loop though the months to create the tables. The array has store the timestamps of the days. 

    const monthHeaders = monthsToDisplayArray.map((date, i) => {
        return (
            <th>{date.toLocaleString('default', { month: 'long',   year: "numeric"})}</th>
        )
    });  
            
             

    return (
        <table>
            <th>Customer Name</th>
            {monthHeaders}
        </table>
    ); 
}

export default MonthTables; 