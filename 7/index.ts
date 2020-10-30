import { Input, Minute } from './model'
import _ from 'lodash';
import fs from 'fs';
import { read } from './io';

const getNewMinutePrice = (min: Minute, powerConsumed, maxPowerNumber) => {
  return Math.ceil(min.price * (1 + powerConsumed / maxPowerNumber))
}

function solve(input: Input): [number, Record<string, Record<number, number>>, Minute[]] {
  const consumption: Record<string, Record<number, number>> = {}

  let result = 0
  for (let t of _.sortBy(input.tasks, task => task.endInterval - task.startInterval)) {
    // console.log(`Processing task #${t.id}`);
    consumption[t.id] = [];

    let taskMinnutes = input.minutes.slice(t.startInterval, t.endInterval + 1)
    let powerToConsume = t.power
    while (powerToConsume > 0) {
      const matchingMinutes = taskMinnutes.filter(m => m.powerLeft > 0 && (m.tasksIdsConsumed.has(t.id) || m.tasksIdsConsumed.size < input.maxConcurrentTasks))
      const currentMin = _.minBy(matchingMinutes, input.priceOfMinute)

      if (currentMin.powerLeft !== 0) {

        const consumeNow = Math.min(1, currentMin.powerLeft, powerToConsume)
        // if (t.id == 2593) {
        //   console.log('consumeNow', consumeNow);
        // }
        powerToConsume -= consumeNow

        currentMin.tasksIdsConsumed.add(t.id)

        result += consumeNow * currentMin.price
        currentMin.powerLeft -= consumeNow
        currentMin.powerConsumed += consumeNow
        if (consumeNow > 0) {
          if (!consumption[t.id][currentMin.index]) {
            consumption[t.id][currentMin.index] = 0
          }
          consumption[t.id][currentMin.index] += consumeNow;
        }
      }
    }

  }

  return [result, consumption, input.minutes];
}


function main(file: string, output: string) {
  const input = read(file);
  const taskByHousehold = _.groupBy(input.tasks, t => t.householdId)
  const resultsByHousehold: Record<number, Record<string, Record<number, number>>> = {};
  let currentMinutes = input.minutes;
  let currentMaxBill = 0;
  for(let t of Object.keys(taskByHousehold)){
    const tasks = taskByHousehold[t]
    const [maxBill, results, ms] = solve({
      ...input,
      minutes: currentMinutes.map(m => ({...m, tasksIdsConsumed: new Set<number>(), powerLeft: input.maxPower}))

    });
    resultsByHousehold[t] = results
    currentMaxBill += maxBill
    currentMinutes = ms
  }
  // const [maxBill, results] = solve(input);
  console.log(currentMaxBill)
  if (currentMaxBill> input.maxBill) {
    console.error(`${file} = shit: ${currentMaxBill} > ${input.maxBill}`);
  }
  const lines = [
    input.households,
    ..._.flattenDeep(Object.entries(resultsByHousehold).map(([househould, results]) => [
      househould,
      taskByHousehold[househould].length,
      ...taskByHousehold[househould].map(task => {
        const taskConsumption = results[task.id];
        return `${task.id} ` + Object.entries(taskConsumption).map(([minute, power]) => `${minute} ${power}`).join(' ')
      })
    ]))

  ]
  fs.writeFileSync(`./7/data/${output}`, lines.join('\r\n'))
}

// main('./7/data/level7_example.in', 'test.out')

for (let i of [1]) {
  main(`./7/data/level7_${i}.in`, i.toString())
}