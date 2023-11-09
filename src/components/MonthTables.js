
// import TableDataRows from './TableDataRows'; 

function MonthTables({monthsToDisplayArray, transactionLog}) {
    // Loop though the months to create the tables. The array has store the timestamps of the days. 

    const monthHeaders = monthsToDisplayArray.map((date, i) => {
        return (
            <th key={i}>{date.toLocaleString('default', { month: 'long',   year: "numeric"})}</th>
        )
    });  
            
    return (
        <table>
             <thead>
                <tr>
                    <th>Customer Name</th>
                    {monthHeaders}
                </tr>
            </thead>
        </table>
    ); 
}

export default MonthTables; 