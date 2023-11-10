
// import TableDataRows from './TableDataRows'; 

function MonthTables({monthsToDisplay, allTransactionData}) {
    // Loop though the months to create the tables. The array has store the timestamps of the days. 
    
    function getCustomerNameByID(transactionData, id) {
        let customerName = ''; 
        const transactionsWithID = transactionData.filter((transaction) => transaction.customerID == id); 
        transactionsWithID.forEach((customer) => {
            customerName = customer.name; 
        }); 
        return customerName; 
    }

    const uniqueCustomerIDs = ([...new Set(allTransactionData.map((element) => element.customerID))]); 
    const monthHeaders = monthsToDisplay.map((date, i) => {
        return (
            <th key={i}>{date.toLocaleString('default', { month: 'long',   year: "numeric"})}</th>
        )
    });  


 

    const tableDataRows = uniqueCustomerIDs.map((customerID, i) => {
        const customerName = getCustomerNameByID(allTransactionData, customerID)

        const monthlyDataRows = monthsToDisplay.map((date, i) => {
            return (
            <td key={i}>{customerName}'s {date.toLocaleString('default', { month: 'long',   year: "numeric"})}</td>
            )
        }); 

        return (
            <tr>
                <td>
                    {customerName}
                </td>
                {monthlyDataRows}
            </tr>
        )

    })
            
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

export default MonthTables; 