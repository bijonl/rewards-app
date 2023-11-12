function MonthTables ({ monthsToDisplay, allTransactionData, loading }) {
  // Loop though the months to create the tables. The array has store the timestamps of the days.

  function calculateRewardPoints (dollars) {
    let points = 0
    if (dollars >= 50) {
      if (dollars - 100 >= 0) {
        points += ((100 - 50))
        points += ((dollars - 100) * 2)
      } else {
        points += (dollars - 50)
      }
    }
    return points
  }

  function getPointsPerMonthByID (data, date, ID) {
    const filteredTransactionsByMonth = data.filter((transaction) => {
      return date.toLocaleString('default', { month: 'long', year: 'numeric' }) == new Date(transaction.transactionDate).toLocaleString('default', { month: 'long', year: 'numeric' })
    })

    const filteredMonthlyTransactionsByID = filteredTransactionsByMonth.filter((transaction) => {
      return transaction.customerID == ID
    })

    const transactionPointAmountsMonthlyByID = filteredMonthlyTransactionsByID.map((transaction) => {
      const transactionAmtDollars = Math.floor(transaction.transactionAmt.replace(/[^0-9.-]+/g, ''))
      return calculateRewardPoints(transactionAmtDollars)
    })

    const totalPoints = transactionPointAmountsMonthlyByID.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )

    return totalPoints
  }

  function getCustomerNameByID (transactionData, id) {
    let customerName = ''
    const transactionsWithID = transactionData.filter((transaction) => transaction.customerID == id)
    transactionsWithID.forEach((customer) => {
      customerName = customer.name
    })
    return customerName
  }

  const uniqueCustomerIDs = ([...new Set(allTransactionData.map((element) => element.customerID))])
  const monthHeaders = monthsToDisplay.map((date, i) => {
    return (
            <th key={i}>{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</th>
    )
  })

  const tableDataRows = uniqueCustomerIDs.map((customerID, i) => {
    const customerName = getCustomerNameByID(allTransactionData, customerID)
    const monthlyDataRows = monthsToDisplay.map((date, i) => {
      return (
            <td key={i}>{getPointsPerMonthByID(allTransactionData, date, customerID)}</td>

      )
    })

    return (
            <tr>
                <td>
                    {customerName}
                </td>
                {monthlyDataRows}
            </tr>
    )
  })
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
    )
  } else {
    return (
            <div>Loading...</div>
    )
  }
}

export default MonthTables
