export type Minute = {
  index: number;
  price: number;
  powerLeft: number;
  tasksIdsConsumed: Set<number>
}

export type Task = {
  id: number;
  power: number;
  startInterval: number;
  endInterval: number
}

export type Input = {
  minutes: Minute[];
  tasks: Task[];
  maxBill: number;
  maxConcurrentTasks: number;
  priceOfMinute: (min: Minute) => number
}