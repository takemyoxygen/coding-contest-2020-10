export type Minute = {
  index: number;
  price: number;
  powerLeft: number;
  tasksIdsConsumed: Set<number>;
  basePrice: number;
  powerConsumed: number;
}

export type Task = {
  id: number;
  householdId: number;
  power: number;
  startInterval: number;
  endInterval: number
}

export type Input = {
  minutes: Minute[];
  tasks: Task[];
  maxBill: number;
  maxConcurrentTasks: number;
  maxPower: number;
  priceOfMinute: (min: Minute) => number;
  households: number;
}