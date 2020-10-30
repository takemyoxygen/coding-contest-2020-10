import {read} from './io';

function minPriceId(prices: number[]): number {
    let minPriceIndex = 0
  ​
    for (let i = 1; i < prices.length; i++) {
      if (prices[i] < prices[minPriceIndex]) {
        minPriceIndex = i
      }
    }
  ​
    return minPriceIndex
  }

for (const i of [1,2,3,4,5]){
    const numbers = read(`./1/data/level1_${i}.in`)
    const result = minPriceId(numbers)
    console.log(`test ${i}: ${result}`)
}

// console.log(read(`./1/data/level1_1.in`));