import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { getMonthlyPointsSummaryByUsername } from '../util/util'

RewardTable.propTypes = {
  monthYearsToDisplay: PropTypes.array.isRequired,
  allTransactionData: PropTypes.array,
  loading: PropTypes.bool
}

function RewardTable ({ monthYearsToDisplay, allTransactionData = null, loading = false }) {
  const monthlyPointsSummaryByUsername = useMemo(() => {
    if (!allTransactionData) return {}
    return getMonthlyPointsSummaryByUsername(allTransactionData) // Output object of unique customers. See util.js file for function.
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
        {Object.entries(monthlyPointsSummaryByUsername).map(([customerUsername, monthlyPointsSummary]) => {
          return (
            <tr key={customerUsername}>
              <td>{customerUsername}</td>
              {monthYearsToDisplay.map(monthYear => {
                return <td key={monthYear}>{monthlyPointsSummary[monthYear] ? monthlyPointsSummary[monthYear] : 0}</td>
              })}
              <td>{monthYearsToDisplay.reduce((total, monthYear) => total + (monthlyPointsSummary[monthYear] ? monthlyPointsSummary[monthYear] : 0), 0)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default RewardTable
