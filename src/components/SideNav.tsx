import { API_HOST } from '@/config'
import { SideNavButton } from './SideNavButton'

interface SideNavProps {
  onLogout: () => void
}

export const SideNav: React.FC<SideNavProps> = ({ onLogout }) => {
  function logout (): void {
    fetch(`${API_HOST}/logout`, {
      method: 'GET',
      headers: {},
      credentials: 'include'
    }).catch(error => {
      console.log(error)
    })
    onLogout()
    window.location.assign('http://localhost:5173/')
  }

  return (
    <nav className='flex flex-col bg-[#111215] w-20 h-screen fixed items-center '>
      <div className='mt-[1.5em] mb-2'>
        <svg
          className='icon icon-tabler icon-tabler-rocket'
          width='56'
          height='56'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='#ffffff'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3' />
          <path d='M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3' />
          <path d='M15 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' />
        </svg>
      </div>
      <SideNavButton href='/'>
        <svg
          className='icon icon-tabler icon-tabler-home'
          width='34'
          height='34'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='#ffffff'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M5 12l-2 0l9 -9l9 9l-2 0' />
          <path d='M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7' />
          <path d='M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6' />
        </svg>
      </SideNavButton>
      <SideNavButton href='user'>
        <svg
          className='icon icon-tabler icon-tabler-user'
          width='34'
          height='34'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='#ffffff'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0' />
          <path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' />
        </svg>
      </SideNavButton>
      <SideNavButton href='#'>
        <svg
          className='icon icon-tabler icon-tabler-calendar'
          width='34'
          height='34'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='#ffffff'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z' />
          <path d='M16 3v4' />
          <path d='M8 3v4' />
          <path d='M4 11h16' />
          <path d='M11 15h1' />
          <path d='M12 15v3' />
        </svg>
      </SideNavButton>

      <SideNavButton href='#'>
        <svg
          className='icon icon-tabler icon-tabler-chart-line'
          width='34'
          height='34'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='#ffffff'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M4 19l16 0' />
          <path d='M4 15l4 -6l4 2l4 -5l4 4' />
        </svg>
      </SideNavButton>
      <SideNavButton href='#'>
        <svg
          className='icon icon-tabler icon-tabler-cloud-upload'
          width='34'
          height='34'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='#ffffff'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1' />
          <path d='M9 15l3 -3l3 3' />
          <path d='M12 12l0 9' />
        </svg>
      </SideNavButton>
      <SideNavButton href='#'>
        <svg
          className='icon icon-tabler icon-tabler-map'
          width='34'
          height='34'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='#ffffff'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13' />
          <path d='M9 4v13' />
          <path d='M15 7v13' />
        </svg>
      </SideNavButton>
      <SideNavButton href='#'>
        <svg
          className='icon icon-tabler icon-tabler-adjustments-horizontal'
          width='34'
          height='34'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='#ffffff'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
          <path d='M4 6l8 0' />
          <path d='M16 6l4 0' />
          <path d='M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
          <path d='M4 12l2 0' />
          <path d='M10 12l10 0' />
          <path d='M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
          <path d='M4 18l11 0' />
          <path d='M19 18l1 0' />
        </svg>
      </SideNavButton>

      <button
        onClick={logout}
        className='mt-[1.5rem]
      w-12 h-12 flex justify-center items-center
      rounded-full hover:bg-[rgba(255,255,255,0.1)] cursor-pointer'
      >
        <svg
          className='icon icon-tabler icon-tabler-logout-2'
          width='34'
          height='34'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='#ffffff'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2' />
          <path d='M15 12h-12l3 -3' />
          <path d='M6 15l-3 -3' />
        </svg>
      </button>

    </nav>
  )
}
