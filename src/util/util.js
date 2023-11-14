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

function getPointsPerMonthByUsername (data, monthYear, username) {
  if (!data || !monthYear || !username) return 0
  const filteredTransactionsByMonth = data.filter((transaction) => {
    return monthYear === formatDateToMonthYear(new Date(transaction.transactionDate))
  })

  const filteredMonthlyTransactionsByUsername = filteredTransactionsByMonth.filter((transaction) => {
    return transaction.username === username
  })

  return filteredMonthlyTransactionsByUsername.reduce(
    (pointTotal, transaction) => {
      const rewardPointsPerTransaction = calculateRewardPoints(transaction.transactionAmount)
      return pointTotal + rewardPointsPerTransaction
    },
    0
  )
}

export { formatDateToMonthYear, calculateRewardPoints, getPointsPerMonthByUsername }
