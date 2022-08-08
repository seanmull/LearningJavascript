/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let buy = prices[0];
  let profit = 0;

  // loop through sell times
  for (let i = 1; i < prices.length; i++) {
    // update profit against current sell and previous buy
    profit = Math.max(profit, prices[i] - buy);
    // update buy after you update the profit, this way it ensures
    // buy is always before sell
    buy = Math.min(buy, prices[i]);
  }
  return profit;
};
