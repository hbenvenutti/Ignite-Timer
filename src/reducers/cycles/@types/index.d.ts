import { ActionTypes } from '../enums'

import type { Cycle } from '../../../hooks/Cycle-Context'

export interface CycleAction {
  type: ActionTypes
  payload: {
    cycle?: Cycle
    activeCycleId?: string | null
  }
}

export interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}
