function split_into(totalAmount, piece, exponent) {
  let totalAmountExp = parseFloat(totalAmount) * 10 ** exponent;

  let number = parseFloat(totalAmountExp.toFixed(0));

  let ary = [];

  for (let step = 0; step < number % piece; step++) {
    ary.push((parseInt(number / piece) + 1) / 10 ** exponent);
  }

  for (let step = 0; step < piece - (number % piece); step++) {
    ary.push(parseInt(number / piece) / 10 ** exponent);
  }

  return ary;
}

function round(amount, exponent) {
  if (amount) {
    return parseFloat(amount.toFixed(exponent));
  } else {
    return 0;
  }
}

export { round, split_into };
