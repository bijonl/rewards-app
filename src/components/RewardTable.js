import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { getUniqueCustomerDataObject } from '../util/util'

RewardTable.propTypes = {
  monthYearsToDisplay: PropTypes.array.isRequired,
  allTransactionData: PropTypes.array,
  loading: PropTypes.bool
}

function RewardTable ({ monthYearsToDisplay, allTransactionData = null, loading = false }) {
  const uniqueCustomerUsernameObject = useMemo(() => {
    if (!allTransactionData) return []
    return getUniqueCustomerDataObject(allTransactionData) // Output object of unique customers. See util.js file for function.
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
        {
        Object.entries(uniqueCustomerUsernameObject).map(([customerUsername, customerTransactionData]) => {
          let userTotal = 0
          return (
            <tr key={customerUsername}>
              <td>{customerUsername}</td>
              {monthYearsToDisplay.map(monthYear => {
                // Need this formatting to be able to look up the month in the Object.
                const formattedMonthYearLookupValue = monthYear.replace(' ', '_').toLowerCase()
                userTotal += customerTransactionData[formattedMonthYearLookupValue] ? customerTransactionData[formattedMonthYearLookupValue] : 0
                return <td key={monthYear}>{customerTransactionData[formattedMonthYearLookupValue] ? customerTransactionData[formattedMonthYearLookupValue] : 0}</td>
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
