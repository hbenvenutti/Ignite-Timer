/* eslint-disable no-unused-vars */
import type { ReactNode } from 'react'
export interface Cycle {
  id: string
  task: string
  timer: number
  startTime: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export interface CycleData {
  task: string
  timer: number
}

export interface CycleContextData {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  cycles: Cycle[]
  elapsedTime: number

  finishCycle: () => void
  createNewCycle: (data: CycleData) => void
  interruptCycle: () => void
  updateElapsedTime: (time: number) => void
}

export interface CycleProps {
  children: ReactNode
}

// export interface ActionType {
//   CREATE_CYCLE: 'CREATE_CYCLE'
//   INTERRUPT_CYCLE: 'INTERRUPT_CYCLE'
//   FINISH_CYCLE: 'FINISH_CYCLE'
// }

export enum ActionType {
  CREATE_CYCLE = 'CREATE_CYCLE',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
  FINISH_CYCLE = 'FINISH_CYCLE',
}

export interface CycleAction {
  type: ActionType
  payload: {
    cycle?: Cycle
    activeCycleId?: string | null
  }
}

export interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}
