import { evaluate, round } from 'mathjs'

function sumOwers(owers, exponent) {
  let summaryAmount = owers.reduce(function (previousValue, ower) {
    try {
      if (ower.amount && evaluate(ower.amount) > 0) {
        return previousValue + ower.amount
      }
    } catch {
      return previousValue
    }

    return previousValue
  }, 0)

  summaryAmount = round(summaryAmount, exponent)

  return summaryAmount
}

export {
  sumOwers
}
