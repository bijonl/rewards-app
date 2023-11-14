import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { getPointsPerMonthByUsername } from '../util/util'

RewardTable.propTypes = {
  monthYearsToDisplay: PropTypes.array.isRequired,
  allTransactionData: PropTypes.array,
  loading: PropTypes.bool
}

function RewardTable ({ monthYearsToDisplay, allTransactionData = null, loading = false }) {
  const uniqueCustomerUsernames = useMemo(() => {
    if (!allTransactionData) return []
    return ([...new Set(allTransactionData.map((element) => element.username))])
  }, [allTransactionData])

  if (loading) return <div>Loading...</div>

  return (
    <table>
      <thead>
        <tr>
          <th>Customer Username</th>
            {monthYearsToDisplay.map(monthYear => (
              <th key={monthYear}>{monthYear}</th>
            ))}
          <th>Total Points</th>
        </tr>
      </thead>
      <tbody>
        {uniqueCustomerUsernames.map(customerUsername => {
          let userTotal = 0
          return (
            <tr key={customerUsername}>
              <td>{customerUsername}</td>
              {monthYearsToDisplay.map(monthYear => {
                const pointsPerMonthAndUsername = getPointsPerMonthByUsername(allTransactionData, monthYear, customerUsername)
                userTotal += pointsPerMonthAndUsername
                return <td key={monthYear}>{pointsPerMonthAndUsername}</td>
              })}
              <td>{userTotal}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default RewardTable
