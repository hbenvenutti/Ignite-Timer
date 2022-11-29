export interface Cycle {
  id: string
  task: string
  timer: number
  startTime: Date
  interruptedDate?: Date
  finishedDate?: Date
}
