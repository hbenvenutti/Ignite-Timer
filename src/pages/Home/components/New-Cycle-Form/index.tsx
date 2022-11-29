import { useFormContext } from 'react-hook-form'
import { useCycles } from '../../../../hooks/Cycle-Context'
import { FormContainer, TaskInput, TimerInput } from './styles'

export const NewCycleForm = () => {
  const { activeCycle, cycles } = useCycles()
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        type="text"
        list="task-suggestions"
        placeholder="Dê um nome ao seu projeto"
        {...register('task')}
        disabled={!!activeCycle}
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
        disabled={!!activeCycle}
      />

      <datalist id="task-suggestions">
        {cycles.map((cycle) => (
          <option key={cycle.id} value={cycle.task} />
        ))}
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
      </datalist>

      <span>minutos.</span>
    </FormContainer>
  )
}
