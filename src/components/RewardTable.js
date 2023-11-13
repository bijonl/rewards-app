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

function getPointsPerMonthByUsername (data, date, username) {
  const filteredTransactionsByMonth = data.filter((transaction) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' }) === new Date(transaction.transactionDate).toLocaleString('default', { month: 'long', year: 'numeric' })
  })

  const filteredMonthlyTransactionsByUsername = filteredTransactionsByMonth.filter((transaction) => {
    return transaction.username === username
  })

  const transactionPointAmountsMonthlyByUsername = filteredMonthlyTransactionsByUsername.map((transaction) => {
    const transactionAmtDollars = Math.floor(transaction.transactionAmount.replace(/[^0-9.-]+/g, ''))
    return calculateRewardPoints(transactionAmtDollars)
  })

  const totalPoints = transactionPointAmountsMonthlyByUsername.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )

  return totalPoints
}

function MonthTables ({ monthsToDisplay, allTransactionData, loading }) {
  // Loop though the months to create the tables. The array has store the timestamps of the days.
  const uniqueCustomerIDs = useMemo(
    () => ([...new Set(allTransactionData.map((element) => element.username))]), [allTransactionData]
  )

  if(loading) return <div>Loading...</div>

  if (loading === false) {
    return (
            <table>
                 <thead>
                    <tr>
                        <th>Customer Username</th>
                        {monthsToDisplay.map((date, i) => {
                              return (
                                <th key={i}>{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</th>
                          )
                        })}
                        <th>Total Points</th>
                    </tr>
                  </thead>
                  <tbody>
                  {uniqueCustomerIDs.map((customerID, i) => {
                      let userTotal = 0; 
                      return (
                        <>
                         
                          <tr key={i}>
                              <td>
                                {customerID}
                              </td>
                              {monthsToDisplay.map((date, i) => {
                                userTotal += getPointsPerMonthByUsername(allTransactionData, date, customerID); 
                                return (
                                  <>
                                  <td key={i}>{getPointsPerMonthByUsername(allTransactionData, date, customerID)}</td>
                                  </>
                                )
                              })}
                              <td>{userTotal}</td>
                          </tr>
                        </>
                      )
                    }
                  )}
                  </tbody>
            </table>
    )
  }
}

export default MonthTables
