/* eslint-disable prettier/prettier */
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { useCycles } from '../../hooks/Cycle-Context'
import { HistoryContainer, HistoryList, Status } from './styles'

export const History = () => {
  const { cycles } = useCycles()

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.timer} minutos</td>
                <td>{formatDistanceToNow(cycle.startTime, {addSuffix: true, locale: ptBR})}</td>
                <td>
                  {
                    cycle.finishedDate 
                      ? <Status statusColor="green">Concluído</Status>
                      : cycle.interruptedDate 
                        ? <Status statusColor="red">Interrompido</Status>
                        : <Status statusColor="yellow">Em andamento</Status>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
