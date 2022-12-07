import { Cycle } from '../../hooks/Cycle-Context/@types'
import { ActionTypes } from './enums'

export const createCycleAction = (newCycle: Cycle) => {
  return {
    type: ActionTypes.CREATE_CYCLE,
    payload: {
      cycle: newCycle,
    },
  }
}

export const finishCycleAction = () => {
  return {
    type: ActionTypes.FINISH_CYCLE,
  }
}

export const interruptCycleAction = () => {
  return {
    type: ActionTypes.INTERRUPT_CYCLE,
  }
}
