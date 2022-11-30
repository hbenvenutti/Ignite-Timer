import { FormProvider, useForm } from 'react-hook-form'
import { HandPalm, Play } from 'phosphor-react'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

import { NewCycleForm } from './components/New-Cycle-Form'
import { Countdown } from './components/Countdown'
import { useCycles } from '../../hooks/Cycle-Context'

import type { NewCycleFormData } from './@types'

// ---------------------------------------------------------------------------------------------- //

export const Home = () => {
  // *** ---- Contexts ---------------------------------------------------------------------- *** //
  const { activeCycle, createNewCycle, interruptCycle } = useCycles()

  const newCycleForm = useForm<NewCycleFormData>({
    defaultValues: { task: '', timer: 0 },
  })

  // *** ---- Vars -------------------------------------------------------------------------- *** //
  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task

  // *** ---- Functions --------------------------------------------------------------------- *** //

  const handleCycleCreation = (data: NewCycleFormData) => {
    createNewCycle(data)

    reset()
  }

  // -------------------------------------------------------------------------------------------- //

  const handleCycleInterruption = () => {
    interruptCycle()
  }

  // *** ---- TSX --------------------------------------------------------------------------- *** //

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCycleCreation)} action="">
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
