import { ActionTypes } from './enums'

import type { CycleAction, CyclesState } from './@types'
import type { Cycle } from '../../hooks/Cycle-Context/@types'

export const cyclesReducer = (state: CyclesState, action: CycleAction) => {
  switch (action.type) {
    case ActionTypes.CREATE_CYCLE:
      if (!action.payload) return state

      return {
        ...state,
        cycles: [...state.cycles, action.payload.cycle as Cycle],
        activeCycleId: action.payload.cycle.id,
      }

    case ActionTypes.INTERRUPT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, interruptedDate: new Date() }
          }

          return cycle
        }),
        activeCycleId: null,
      }

    case ActionTypes.FINISH_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedDate: new Date() }
          }

          return cycle
        }),

        activeCycleId: null,
      }

    default:
      return state
  }
}
