function formatDateToMonthYear (date) {
  return date.toLocaleString('default', { month: 'long', year: 'numeric' })
}

function calculateRewardPoints (amount) {
  const dollars = Math.floor(amount)
  if (dollars > 100) {
    return 50 + ((dollars - 100) * 2)
  }

  return dollars > 50 ? dollars - 50 : 0
}

// This function Returns an object for each customer.
// In the object, the key is the customer username. The value is an object with a
// key-value pair of date (month year)-reward points (for example, November 2023: 430)
function getMonthlyPointsSummaryByUsername (transactionData) {
  // Initialize Object
  const monthlyPointsSummaryByUsername = {}
  transactionData.forEach((transaction) => {
    const transactionMonthYear = formatDateToMonthYear(new Date(transaction.transactionDate))
    if (Object.hasOwn(monthlyPointsSummaryByUsername, transaction.username)) { // If username is ALREADY IN the object
      // Check if the month_year has been accounted for previously
      if (Object.hasOwn(monthlyPointsSummaryByUsername[transaction.username], transactionMonthYear)) {
        // If the date is already attached to that username, add the transaction amount in points.
        monthlyPointsSummaryByUsername[transaction.username][transactionMonthYear] += calculateRewardPoints(transaction.transactionAmount)
      } else {
        // If date is attached to the username, initialize that key-value paid in the transacation data object.
        monthlyPointsSummaryByUsername[transaction.username][transactionMonthYear] = calculateRewardPoints(transaction.transactionAmount)
      }
    } else { // If username is NOT in the object
      // Create new key-value pair with username as the key and empty object as value
      monthlyPointsSummaryByUsername[transaction.username] = {}
      // Set username object key-value to the month_year and transaction amount in points.
      monthlyPointsSummaryByUsername[transaction.username][transactionMonthYear] = calculateRewardPoints(transaction.transactionAmount)
    }
  })
  return monthlyPointsSummaryByUsername
}

export { formatDateToMonthYear, calculateRewardPoints, getMonthlyPointsSummaryByUsername }
