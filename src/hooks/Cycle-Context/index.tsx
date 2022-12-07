import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from 'react'

import { cyclesReducer } from '../../reducers/cycles'
import { ActionTypes } from '../../reducers/cycles/enums'

import type { Cycle, CycleContextData, CycleData, CycleProps } from './@types'

// ---------------------------------------------------------------------------------------------- //

const CyclesContext = createContext<CycleContextData>({} as CycleContextData)

export const CyclesContextProvider = ({ children }: CycleProps) => {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  // *** ---- States ------------------------------------------------------------------------ *** //

  const [elapsedTime, setElapsedTime] = useState(0)

  // *** ---- Variables --------------------------------------------------------------------- *** //
  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  // *** ---- Functions --------------------------------------------------------------------- *** //

  const finishCycle = (): void => {
    dispatch({
      type: ActionTypes.FINISH_CYCLE,
      payload: {
        activeCycleId,
      },
    })
  }

  // -------------------------------------------------------------------------------------------- //

  const createNewCycle = (data: CycleData) => {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      timer: data.timer,
      startTime: new Date(),
    }

    dispatch({
      type: ActionTypes.CREATE_CYCLE,
      payload: {
        cycle: newCycle,
      },
    })

    setElapsedTime(0)
  }

  // -------------------------------------------------------------------------------------------- //

  const interruptCycle = () => {
    dispatch({
      type: ActionTypes.INTERRUPT_CYCLE,
      payload: {
        activeCycleId,
      },
    })
  }

  // -------------------------------------------------------------------------------------------- //
  const updateElapsedTime = (time: number): void => {
    setElapsedTime(time)
  }

  // *** ---- Use Effects ------------------------------------------------------------------- *** //
  useEffect(() => {
    // const newActiveCycle = cycles.find((cycle) => cycle.id === activeCycleId)
    // setActiveCycle(newActiveCycle)
  }, [activeCycleId, cycles])

  // *** ---- TSX --------------------------------------------------------------------------- *** //

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        cycles,
        elapsedTime,
        finishCycle,
        createNewCycle,
        interruptCycle,
        updateElapsedTime,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

export const useCycles = () => {
  const context = useContext(CyclesContext)
  return context
}
