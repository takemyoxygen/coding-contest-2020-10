import { Input, Task, Minute } from "./model";
import _ from 'lodash';
import fs from 'fs';

export function read(input: string): Input{
  const content: string = fs.readFileSync(input).toString();
  const [maxPower, maxBill, n, ...values] = content.split('\r\n');
  const prices = _.take(values, parseInt(n, 10)).map(s => parseInt(s, 10));
  const [m, ...rawTasks] = values.slice(parseInt(n, 10));

  const tasks: Task[] = _.take(rawTasks, parseInt(m)).map(task => {
    const [id, power, startInterval, endInterval] = task.split(' ').map(x => parseInt(x, 10));
    return {id, power, startInterval, endInterval};
  });

  const minutes: Minute[] = prices.map((price, index) => ({index, price, powerLeft: Number(maxPower)}))

  console.log(tasks)
  return {minutes, tasks, maxBill: Number(maxBill)};
}

// console.log(read('./4/data/level4_example.in'))