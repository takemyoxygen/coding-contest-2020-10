import { Input, Task, Minute } from "./model";
import _ from 'lodash';
import fs from 'fs';

export function read(input: string): Input{
  const content: string = fs.readFileSync(input).toString();
  const [maxPower, maxBill, maxConcurrentTasks, n, ...values] = content.split('\r\n');
  const prices = _.take(values, parseInt(n, 10)).map(s => parseInt(s, 10));
  const [h, ...rawTasks] = values.slice(parseInt(n, 10));


  const tasks: Task[] = [];
  for (let householdId  = 1; householdId <= Number(h); householdId ++) {
    // for (const line of rawTasks) console.log(`rawTasks`, line);
    const [m, ...rest] = rawTasks;
    // console.log(m, 'm', 'rest size', rest.length)

  const newTasks = _.take(rest, Number(m)).map(task => {
    const [id, power, startInterval, endInterval] = task.split(' ').map(x => parseInt(x, 10));
    return {id, power, startInterval, endInterval, householdId};
  });

    tasks.push(...newTasks);
    rest.splice(0, Number(m));
  }

  const maxPowerNumber = Number(maxPower)

  const minutes: Minute[] = prices.map((price, index) => ({index, powerConsumed: 0, basePrice: price, price, powerLeft: maxPowerNumber, tasksIdsConsumed: new Set<number>()}))

  return {
    households: Number(h),
    minutes,
    tasks,
    maxBill: Number(maxBill),
    maxConcurrentTasks: Number(maxConcurrentTasks),
    maxPower: maxPowerNumber,
    priceOfMinute: min => Math.ceil(min.basePrice * (1 + min.powerConsumed / maxPowerNumber))
  };
}

//const result = read('./7/data/level7_example.in')
// console.log(result)
// console.log(result.tasks.length)
