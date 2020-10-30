import {Input, Minute} from './model'
import _ from 'lodash';
import fs from 'fs';
import { read } from './io';

function solve(input: Input){
  const consumption:Record<string, [Minute, number][]> = {}

    let result = 0
    for(let t of _.sortBy(input.tasks, task => task.endInterval - task.startInterval)){
      consumption[t.id] = [];

        let taskMinnutes = input.minutes.slice(t.startInterval, t.endInterval + 1)
        const sortedMinutes = _.sortBy(taskMinnutes, (m => m.price))
        let powerToConsume = t.power
        let index = 0
        while(powerToConsume > 0){
            const consumeNow = Math.min(powerToConsume, sortedMinutes[index].powerLeft)
            powerToConsume -= consumeNow
            result += consumeNow *sortedMinutes[index].price
            sortedMinutes[index].powerLeft -= consumeNow
            if (consumeNow > 0) {
              consumption[t.id].push([sortedMinutes[index], consumeNow])
            }
          index++
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
      return `${task.id} ` + taskConsumption.map(([minute, power]) => `${minute.index} ${power}`).join(' ')
    })
  ]
  fs.writeFileSync(`./4/data/${output}`, lines.join('\r\n'))
}

// main('4/data/level4_example.in', 'test')

for(let i of [3, 4, 5]){
  main(`./4/data/level4_${i}.in`, i.toString())
}