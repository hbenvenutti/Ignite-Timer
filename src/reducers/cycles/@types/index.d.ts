import { ActionTypes } from '../enums'

import type { Cycle } from '../../../hooks/Cycle-Context/@types'
export interface CycleAction {
  type: ActionTypes
  payload?: {
    cycle: Cycle
  }
}

export interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}
