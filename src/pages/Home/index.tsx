import { Play } from 'phosphor-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  Separator,
  StartCountdownButton,
  TaskInput,
  TimerInput,
} from './styles'

interface NewCycleFormData {
  task: string
  timer: number
}

interface Cycle {
  id: string
  task: string
  timer: number
}

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    defaultValues: { task: '', timer: 0 },
  })

  const task = watch('task')
  const isSubmitDisabled = !task

  const handleNewCycleCreation = (data: NewCycleFormData) => {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      timer: data.timer,
    }

    setCycles((state) => [...state, newCycle])

    setActiveCycleId(id)

    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.timer * 60 : 0

  const remainingTime = activeCycle ? totalSeconds - elapsedTime : 0

  const remainingMinutes = Math.floor(remainingTime / 60)
  const remainingSeconds = remainingTime % 60

  const minutes = String(remainingMinutes).padStart(2, '0')
  const seconds = String(remainingSeconds).padStart(2, '0')

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleNewCycleCreation)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            list="task-suggestions"
            placeholder="Dê um nome ao seu projeto"
            {...register('task')}
          />

          <label htmlFor="minutes">durante</label>
          <TimerInput
            id="timer"
            type="number"
            placeholder="00"
            step={5}
            max={60}
            min={5}
            {...register('timer', { valueAsNumber: true })}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
