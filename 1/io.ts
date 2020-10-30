import fs from 'fs';
import _ from 'lodash';

export function read(input: string): any[] {
  const content: string = fs.readFileSync(input).toString();
  const [n, ...values] = content.split('\r\n');
  return _.take(values, parseInt(n)).map(s => parseInt(s, 10));
}

