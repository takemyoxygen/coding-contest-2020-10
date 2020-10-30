import { Input, Minute } from './model'
import _ from 'lodash';
import fs from 'fs';
import { read } from './io';

function solve(input: Input): [number, Record<string, Record<number, number>>] {
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

        const consumeNow = Math.min(50, currentMin.powerLeft, powerToConsume)
        // if (t.id == 2593) {
        //   console.log('consumeNow', consumeNow);
        // }
        powerToConsume -= consumeNow

        currentMin.tasksIdsConsumed.add(t.id)

        result += consumeNow * currentMin.price
        currentMin.powerLeft -= consumeNow

        if (consumeNow > 0) {
          if (!consumption[t.id][currentMin.index]) {
            consumption[t.id][currentMin.index] = 0
          }
          consumption[t.id][currentMin.index] += consumeNow;
        }
      }
    }

  }

  return [result, consumption];
}


function main(file: string, output: string) {
  const input = read(file);
  const [maxBill, results] = solve(input);
  console.log(maxBill)
  if (maxBill > input.maxBill) {
    console.error(`${file} = shit: ${maxBill} > ${input.maxBill}`);
  }
  const lines = [
    input.tasks.length,
    ...input.tasks.map(task => {
      const taskConsumption = results[task.id];
      return `${task.id} ` + Object.entries(taskConsumption).map(([minute, power]) => `${minute} ${power}`).join(' ')
    })
  ]
  fs.writeFileSync(`./6/data/${output}`, lines.join('\r\n'))
}

// main('./6/data/level6_example.in', 'test.out')

for (let i of [5]) {
  main(`./6/data/level6_${i}.in`, i.toString())
}