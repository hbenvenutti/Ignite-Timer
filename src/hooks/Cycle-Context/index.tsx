import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react'

import { Cycle } from './@types/cycle'

interface CycleContextData {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  cycles: Cycle[]
  elapsedTime: number

  finishCycle: () => void
  updateElapsedTime: (value: number) => void
  updateActiveCycleId: (value: string | null) => void
  addNewCycle: (newCycle: Cycle) => void
  interruptCycle: () => void
}

interface CycleProps {
  children: ReactNode
}

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

  const updateElapsedTime = (value: number) => {
    setElapsedTime(value)
  }

  // -------------------------------------------------------------------------------------------- //

  const updateActiveCycleId = (value: string | null) => {
    setActiveCycleId(value)
  }

  // -------------------------------------------------------------------------------------------- //

  const addNewCycle = (newCycle: Cycle) => {
    setCycles((state) => [...state, newCycle])
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
        updateElapsedTime,
        updateActiveCycleId,
        addNewCycle,
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
