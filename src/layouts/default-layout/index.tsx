import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { DefaultLayoutContainer } from './styles'

export const DefaultLayout = () => {
  return (
    <DefaultLayoutContainer>
      <Header />
      <Outlet />
    </DefaultLayoutContainer>
  )
}
