import { SideNav } from '../components/SideNav'
import { SecondarySideNav } from '../components/SecondarySideNav'
import { Content } from '../components/Content'
import { Route } from 'wouter'
import { Calendar } from '../components/Calendar'
import * as types from '../common/types'
import { UserPage } from './UserPage'
interface homeProps {
  onLogout: () => void
  user: types.User
}

export const Home = (props: homeProps): any => {
  function handleLogin (): void {
    props.onLogout()
  }

  const Router = (): any => {
    return (
      <div className='h-screen w-screen bg-[#2a2b2f]'>
        <SideNav onLogout={handleLogin} />
        <SecondarySideNav />
        <section className='pt-[1.5rem] lg:ml-[23rem] ml-20 px-8 flex h-screen flex-col'>
          <Route path='/' component={(propiedades) => <Content {...propiedades} user={props.user} />} />
          <Route path='/calendar' component={Calendar} />
          <Route path='/user' component={(propiedades) => <UserPage {...propiedades} user={props.user} />} />
        </section>
      </div>
    )
  }

  return (
    <Router />
  )
}
