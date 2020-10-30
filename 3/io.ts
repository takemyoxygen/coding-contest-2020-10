import fs from 'fs';
import _ from 'lodash';

export type Task = {
  id: number;
  power: number;
  startInterval: number;
  endInterval: number
}

export function read(input: string): [number[], Task[]] {
  const content: string = fs.readFileSync(input).toString();
  const [n, ...values] = content.split('\r\n');
  const prices = _.take(values, parseInt(n, 10)).map(s => parseInt(s, 10));
  const [m, ...rawTasks] = values.slice(parseInt(n, 10));
  const tasks: Task[] = _.take(rawTasks, parseInt(m)).map(task => {
    const [id, power, startInterval, endInterval] = task.split(' ').map(x => parseInt(x, 10));
    return {id, power, startInterval, endInterval};
  });
  console.log(tasks)
  return [prices, tasks];
}