import fs from 'fs';
import _ from 'lodash';

export function read(input: string): [number[], [number, number][]] {
  const content: string = fs.readFileSync(input).toString();
  const [n, ...values] = content.split('\r\n');
  const prices = _.take(values, parseInt(n, 10)).map(s => parseInt(s, 10));
  const [m, ...rawTasks] = values.slice(parseInt(n, 10));
  const tasks = _.take(rawTasks, parseInt(m)).map(task => task.split(' ').map(x => parseInt(x, 10)));
  return [prices, tasks] as any;
}