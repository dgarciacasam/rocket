import { SideNav } from '../components/SideNav'
import { SecondarySideNav } from '../components/SecondarySideNav'
import { Content } from '../components/Content'
import { Route } from 'wouter'
import { Calendar } from '../components/Calendar'
import * as types from '../common/types'
import { UserPage } from './UserPage'
import { useState } from 'react'
interface homeProps {
  onLogout: () => void
  user: types.User
}

export const Home = (props: homeProps): any => {
  function handleLogin (): void {
    props.onLogout()
  }

  const sessionStorage = (window.sessionStorage.getItem('showSidenav') === 'true')
  const [showSidenav, setShowSidenav] = useState<boolean>(sessionStorage)

  const handleShowSecondaryNav = (): void => {
    const newShowSidenav = !showSidenav
    setShowSidenav(newShowSidenav)

    window.sessionStorage.setItem('showSidenav', newShowSidenav.toString())
  }

  const Router = (): any => {
    return (
      <div className='h-dvh w-screen bg-[#2a2b2f]'>
        <SideNav onLogout={handleLogin} />
        <Route path='/calendar' component={Calendar} />
        <Route path='/user' component={(propiedades) => <UserPage {...propiedades} user={props.user} showSidenav={showSidenav} />} />
        <Route
          path='/' component={(propiedades) => <>
            <SecondarySideNav handlerIsShown={handleShowSecondaryNav} isShown={showSidenav} />
            <section className={'pt-[1.5rem] px-8 flex h-dvh flex-col' + (showSidenav ? ' lg:ml-[23rem] ml-20 ' : ' lg:ml-20 ml-0')}>
              <Content {...propiedades} user={props.user} />
            </section>
          </>}
        />

      </div>
    )
  }

  return (
    <Router />
  )
}
