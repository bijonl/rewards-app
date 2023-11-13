import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
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
    return date.toLocaleString('default', { month: 'long', year: 'numeric' }) === new Date(transaction.transactionDate).toLocaleString('default', { month: 'long', year: 'numeric' })
  })

  const filteredMonthlyTransactionsByID = filteredTransactionsByMonth.filter((transaction) => {
    return transaction.customerID === ID
  })

  const transactionPointAmountsMonthlyByID = filteredMonthlyTransactionsByID.map((transaction) => {
    const transactionAmtDollars = Math.floor(transaction.transactionAmount.replace(/[^0-9.-]+/g, ''))
    return calculateRewardPoints(transactionAmtDollars)
  })

  const totalPoints = transactionPointAmountsMonthlyByID.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )

  return totalPoints
}

function MonthTables ({ monthsToDisplay, allTransactionData, loading }) {
  // Loop though the months to create the tables. The array has store the timestamps of the days.
  function getCustomerNameByID (transactionData, id) {
    let customerName = ''
    const transactionsWithID = transactionData.filter((transaction) => transaction.customerID === id)
    transactionsWithID.forEach((customer) => {
      customerName = customer.name
    })
    return customerName
  }

  const uniqueCustomerIDs = useMemo(
    () => ([...new Set(allTransactionData.map((element) => element.customerID))]), [allTransactionData]
  )

  if(loading) return <div>Loading...</div>

  if (loading === false) {
    return (
            <table>
                 <thead>
                    <tr>
                        <th>Customer Name</th>
                        {monthsToDisplay.map((date, i) => {
                              return (
                                <th key={i}>{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</th>
                          )
                        })}
                    </tr>
                  </thead>
                  <tbody>
                  {uniqueCustomerIDs.map((customerID, i) => (
                        <tr key={i}>
                            <td>
                              {getCustomerNameByID(allTransactionData, customerID)}
                            </td>
                            {monthsToDisplay.map((date, i) => {
                              return (
                                <td key={i}>{getPointsPerMonthByID(allTransactionData, date, customerID)}</td>
                              )
                            })}
                        </tr>
                      )
                  )}
                  </tbody>
            </table>
    )
  }
}

export default MonthTables
