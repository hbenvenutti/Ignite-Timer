import { differenceInSeconds } from 'date-fns'
import { useEffect } from 'react'
import { useCycles } from '../../../../hooks/Cycle-Context'

import { CountdownContainer, Separator } from './styles'

export const Countdown = () => {
  // *** ---- Contexts ---------------------------------------------------------------------- *** //

  const {
    activeCycle,
    activeCycleId,
    elapsedTime,
    cycles,
    finishCycle,
    updateElapsedTime,
  } = useCycles()

  // *** ---- Variables --------------------------------------------------------------------- *** //

  const timerInSeconds = activeCycle ? activeCycle.timer * 60 : 0

  const remainingTime = activeCycle ? timerInSeconds - elapsedTime : 0

  const remainingMinutes = Math.floor(remainingTime / 60)
  const remainingSeconds = remainingTime % 60

  const minutes = String(remainingMinutes).padStart(2, '0')
  const seconds = String(remainingSeconds).padStart(2, '0')

  // *** ---- Use Effects ------------------------------------------------------------------- *** //

  useEffect(() => {
    if (activeCycle)
      document.title = `${minutes}:${seconds} - ${activeCycle.task}`
  }, [minutes, seconds, activeCycle])

  // -------------------------------------------------------------------------------------------- //

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const difference = differenceInSeconds(
          new Date(),
          activeCycle.startTime,
        )

        if (difference >= timerInSeconds) {
          finishCycle()
          // setActiveCycleId(null)
          updateElapsedTime(timerInSeconds)

          clearInterval(interval)
        } else {
          updateElapsedTime(difference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    timerInSeconds,
    activeCycleId,
    cycles,
    finishCycle,
    updateElapsedTime,
  ])

  // *** ---- TSX --------------------------------------------------------------------------- *** //

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
