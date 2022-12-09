import { produce } from 'immer'

import { ActionTypes } from './enums'

import type { CycleAction, CyclesState } from './@types'

// ---------------------------------------------------------------------------------------------- //

export const cyclesReducer = (state: CyclesState, action: CycleAction) => {
  switch (action.type) {
    case ActionTypes.CREATE_CYCLE:
      return produce(state, (draft) => {
        if (!action.payload) return state

        draft.cycles.push(action.payload.cycle)
        draft.activeCycleId = action.payload.cycle.id
      })

    // ------------------------------------------------------------------------------------------ //

    case ActionTypes.INTERRUPT_CYCLE: {
      const cycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      if (cycleIndex < 0) return state

      return produce(state, (draft) => {
        draft.cycles[cycleIndex].interruptedDate = new Date()
        draft.activeCycleId = null
      })
    }

    // ------------------------------------------------------------------------------------------ //

    case ActionTypes.FINISH_CYCLE: {
      const cycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      if (cycleIndex < 0) return state

      return produce(state, (draft) => {
        draft.cycles[cycleIndex].interruptedDate = new Date()
        draft.activeCycleId = null
      })
    }

    // ------------------------------------------------------------------------------------------ //

    default:
      return state
  }
}
