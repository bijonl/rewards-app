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
// key-value pair of date (month-year)-reward points (for example, november_2023: 430)
function getUniqueCustomerDataObject (transactionData) {
  // Initialize Object
  const uniqueCustomerDataObject = Object.create(null)
  transactionData.forEach((transaction) => {
    // Needed to reformat date for object since object key can't have a space like 'November 2023'
    // Makes the date month_years (ie november_2023)
    // This makes for an easy lookup on output later
    const formattedDateKey = formatDateToMonthYear(new Date(transaction.transactionDate)).replace(' ', '_').toLowerCase()
    if (uniqueCustomerDataObject[transaction.username] === undefined) { // Check if username is NOT in the object
      // Create new key-value pair with username as the key and empty object as value
      uniqueCustomerDataObject[transaction.username] = {}
      // Set username object key-value to the month_year and transaction amount in points.
      uniqueCustomerDataObject[transaction.username][formattedDateKey] = calculateRewardPoints(transaction.transactionAmount)
    } else { // Go into else block is username is already in the object.
      // Check if the month_year has been accounted for previously
      if (uniqueCustomerDataObject[transaction.username][formattedDateKey] !== undefined) {
        // If the date is already attached to that username, add the transaction amount in points.
        uniqueCustomerDataObject[transaction.username][formattedDateKey] += calculateRewardPoints(transaction.transactionAmount)
      } else {
        // If date is attached to the username, initialize that key-value paid in the transacation data object.
        uniqueCustomerDataObject[transaction.username][formattedDateKey] = calculateRewardPoints(transaction.transactionAmount)
      }
    }
  })
  return uniqueCustomerDataObject
}

export { formatDateToMonthYear, calculateRewardPoints, getUniqueCustomerDataObject }
