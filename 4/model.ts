export type Minute = {
  index: number;
  price: number;
  powerLeft: number;
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
}