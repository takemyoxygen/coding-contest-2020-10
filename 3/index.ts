import {read, Task} from './io'
import fs from 'fs'

export function getMinuteIndex(prices: number[], task: Task): {index: number, task}{
    let minPriceIndex = task.startInterval
    ​
      for (let i = task.startInterval; i < task.endInterval + 1; i++) {
        if (prices[i] < prices[minPriceIndex]) {
          minPriceIndex = i
        }
      }
    ​
      return {index: minPriceIndex, task}
}


function solve(prices: number[], tasks: Task[]): string[]{
  const result = [];
  for (const task of tasks) {
    const {index} = getMinuteIndex(prices, task);
    result.push(`${task.id} ${index} ${task.power}`);
  }
  return result;
}

function main(input: string, output: string) {
  const [prices, tasks] = read(input);
  console.log(tasks.length)
  const results = solve(prices, tasks);
  fs.writeFileSync(`./3/data/${output}`, [tasks.length, ...results].join('\r\n'))
}

// main(`./3/data/level3_example.in`, 'test')

for(let i of [1,2,3,4,5]){
    main(`./3/data/level3_${i}.in`, i.toString())
}