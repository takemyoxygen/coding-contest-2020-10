import {read} from './io'
import fs from 'fs'

export function getStartIndex(a: number[], windowLength: number): number{
    let min = 0
    let minSum = a.slice(0, windowLength).reduce((s, current) => s + current, 0)
    let currentSum = minSum
    for(let i = 1; i < a.length; i++){
        currentSum-= a[i-1]
        currentSum+= a[i + windowLength - 1]
        if(currentSum < minSum){
            minSum = currentSum
            min = i
        }
    }

    return min
}


function solve(prices: number[], pairs: any[]): string[]{
  const result = [];
    for(let p of pairs){
        const taskLength = p[1]
        result.push(`${p[0]} ${getStartIndex(prices, taskLength)}`)
        console.log(`${p[0]} ${getStartIndex(prices, taskLength)}`)
    }

    return result;
}

function main(input: string, output: string) {
  const [prices, tasks] = read(input);
  console.log(tasks.length)
  const results = solve(prices, tasks);
  fs.writeFileSync(`./2/data/${output}`, [tasks.length, ...results].join('\r\n'))
}

for(let i of [1,2,3,4,5]){
    main(`./2/data/level2_${i}.in`, i.toString())
}