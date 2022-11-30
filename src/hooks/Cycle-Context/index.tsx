import { createContext, useContext, useState, useEffect } from 'react'

import type { Cycle, CycleContextData, CycleData, CycleProps } from './@types'

// ---------------------------------------------------------------------------------------------- //

const CyclesContext = createContext<CycleContextData>({} as CycleContextData)

export const CyclesContextProvider = ({ children }: CycleProps) => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycle, setActiveCycle] = useState<Cycle | undefined>({} as Cycle)
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)

  // *** ---- Functions --------------------------------------------------------------------- *** //

  const finishCycle = (): void => {
    const alteredCycles = cycles.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, finishedDate: new Date() }
      }

      return cycle
    })

    setCycles(alteredCycles)
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

    setCycles((state) => [...state, newCycle])

    setActiveCycleId(id)

    setElapsedTime(0)
  }

  // -------------------------------------------------------------------------------------------- //

  const interruptCycle = () => {
    const alteredCycles = cycles.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, interruptedDate: new Date() }
      }

      return cycle
    })

    setCycles(alteredCycles)

    setActiveCycleId(null)
  }

  // *** ---- Use Effects ------------------------------------------------------------------- *** //
  useEffect(() => {
    const newActiveCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    setActiveCycle(newActiveCycle)
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
