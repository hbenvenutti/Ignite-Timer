import { FormProvider, useForm } from 'react-hook-form'
import { HandPalm, Play } from 'phosphor-react'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

import { NewCycleForm } from './components/New-Cycle-Form'
import { Countdown } from './components/Countdown'
import { Cycle } from '../../hooks/Cycle-Context/@types/cycle'
import { useCycles } from '../../hooks/Cycle-Context'

interface NewCycleFormData {
  task: string
  timer: number
}

export const Home = () => {
  // *** ---- Contexts ---------------------------------------------------------------------- *** //
  const {
    activeCycle,
    updateActiveCycleId,
    updateElapsedTime,
    addNewCycle,
    interruptCycle,
  } = useCycles()

  const newCycleForm = useForm<NewCycleFormData>({
    defaultValues: { task: '', timer: 0 },
  })

  // *** ---- Vars -------------------------------------------------------------------------- *** //
  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task

  // *** ---- Functions --------------------------------------------------------------------- *** //

  const handleNewCycleCreation = (data: NewCycleFormData) => {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      timer: data.timer,
      startTime: new Date(),
    }

    addNewCycle(newCycle)

    updateActiveCycleId(id)

    updateElapsedTime(0)

    reset()
  }

  // -------------------------------------------------------------------------------------------- //

  const handleCycleInterruption = () => {
    interruptCycle()

    updateActiveCycleId(null)
  }

  // *** ---- TSX --------------------------------------------------------------------------- *** //

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleNewCycleCreation)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={handleCycleInterruption} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
