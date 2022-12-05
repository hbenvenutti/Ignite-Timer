import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from 'react'

import { ActionType } from './@types'

import type {
  Cycle,
  CycleAction,
  CycleContextData,
  CycleData,
  CycleProps,
  CyclesState,
} from './@types'

// ---------------------------------------------------------------------------------------------- //

const CyclesContext = createContext<CycleContextData>({} as CycleContextData)

export const CyclesContextProvider = ({ children }: CycleProps) => {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: CycleAction) => {
      switch (action.type) {
        case 'CREATE_CYCLE':
          if (!action.payload.cycle) return state

          return {
            ...state,
            cycles: [...state.cycles, action.payload.cycle as Cycle],
            activeCycleId: action.payload.cycle.id,
          }

        case 'INTERRUPT_CYCLE':
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

        case 'FINISH_CYCLE':
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
    },
    { cycles: [], activeCycleId: null },
  )

  // *** ---- States ------------------------------------------------------------------------ *** //

  const [elapsedTime, setElapsedTime] = useState(0)

  // *** ---- Variables --------------------------------------------------------------------- *** //
  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  // *** ---- Functions --------------------------------------------------------------------- *** //

  const finishCycle = (): void => {
    dispatch({
      type: ActionType.FINISH_CYCLE,
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
      type: ActionType.CREATE_CYCLE,
      payload: {
        cycle: newCycle,
      },
    })

    setElapsedTime(0)
  }

  // -------------------------------------------------------------------------------------------- //

  const interruptCycle = () => {
    dispatch({
      type: ActionType.INTERRUPT_CYCLE,
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
