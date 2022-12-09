import { differenceInSeconds } from 'date-fns'
import superjson from 'superjson'
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from 'react'

import { cyclesReducer } from '../../reducers/cycles'
import {
  createCycleAction,
  finishCycleAction,
  interruptCycleAction,
} from '../../reducers/cycles/actions'

import type { CyclesState } from '../../reducers/cycles/@types'
import type { Cycle, CycleContextData, CycleData, CycleProps } from './@types'

// ---------------------------------------------------------------------------------------------- //

const CyclesContext = createContext<CycleContextData>({} as CycleContextData)

export const CyclesContextProvider = ({ children }: CycleProps) => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    } as CyclesState,
    (initialValue) => {
      const cyclesCacheJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )

      if (!cyclesCacheJSON) return initialValue

      return superjson.parse<CyclesState>(cyclesCacheJSON)
    },
  )

  // *** ---- Variables --------------------------------------------------------------------- *** //
  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  // *** ---- States ------------------------------------------------------------------------ *** //
  const [elapsedTime, setElapsedTime] = useState(() => {
    if (!activeCycle) return 0

    return differenceInSeconds(new Date(), activeCycle.startTime)
  })

  // *** ---- Functions --------------------------------------------------------------------- *** //
  const finishCycle = (): void => {
    dispatch(finishCycleAction())
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

    dispatch(createCycleAction(newCycle))

    setElapsedTime(0)
  }

  // -------------------------------------------------------------------------------------------- //

  const interruptCycle = () => {
    dispatch(interruptCycleAction())
  }

  // -------------------------------------------------------------------------------------------- //
  const updateElapsedTime = (time: number): void => {
    setElapsedTime(time)
  }

  // *** ---- Use Effects ------------------------------------------------------------------- *** //
  useEffect(() => {
    if (!cyclesState) return

    const stateJSON = superjson.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

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
