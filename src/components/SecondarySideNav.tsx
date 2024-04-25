import { useState } from 'react'
import '../css/SecondarySideNav.css'

function toggleClass (event: React.MouseEvent<HTMLButtonElement>): void {
  ;(event.target as Element).classList.toggle('button-active')
  const icono = (event.target as Element).querySelector('i')
  icono?.classList.toggle('fa-angle-right')
  icono?.classList.toggle('fa-angle-down')

  if ((event.target as Element).nextElementSibling != null) {
    const dropdownMenu: HTMLDivElement = (event.target as Element)
      .nextElementSibling as HTMLDivElement
    if (dropdownMenu.classList.contains('dropdown-container')) {
      dropdownMenu.classList.toggle('active')
      dropdownMenu.classList.toggle('hidden')
    }
  }
}

export const SecondarySideNav = (): JSX.Element => {
  const teams: string[] = ['Loh mejoreh', 'Sosio te rajo', 'Equipito 2024 🔥']
  const projects: string[] = ['Proyecto 1', 'Proyecto 2', 'Proyecto 3']
  const [darkMode, setDarkMode] = useState(true)

  const toggleDarkMode = (): void => {
    setDarkMode(!darkMode)
  }

  return (
    <nav className='bg-[#222327] h-screen w-72 hidden px-8 ml-20 justify-between py-[1.5rem] fixed lg:flex lg:flex-col'>
      <div className='flex flex-col'>
        <div className='flex justify-between items-start mb-3'>
          <h1 className='text-2xl font-semibold'>Projects</h1>
          <a className='h-full flex' href='create-project'>
            <i className='fa-solid fa-plus self-center' />
          </a>
        </div>

        <button className='dropdown-button' onClick={toggleClass}>
          Team
          <i className='fa-solid fa-angle-right' />
        </button>

        <div className='dropdown-container hidden'>
          {teams.map((cadena, index) => (
            <a key={index} href={`#${cadena}`}>
              {cadena}
            </a>
          ))}
        </div>

        <button className='dropdown-button' onClick={toggleClass}>
          Projects
          <i className='fa-solid fa-angle-right' />
        </button>

        <div className='dropdown-container hidden'>
          {projects.map((cadena, index) => (
            <a key={index} href={`#${cadena}`}>
              {cadena}
            </a>
          ))}
        </div>

        <button className='dropdown-button' onClick={toggleClass}>
          Tasks
          <i className='fa-solid fa-angle-right' />
        </button>
        <button className='dropdown-button' onClick={toggleClass}>
          Reminders
          <i className='fa-solid fa-angle-right' />
        </button>
        <button className='dropdown-button' onClick={toggleClass}>
          Messengers
          <i className='fa-solid fa-angle-right' />
        </button>
      </div>
      <div className='flex justify-between bg-[#2b2c30] text-[rgba(255,255,255,0.3)] rounded-full py-1 px-1 '>
        <a
          onClick={toggleDarkMode}
          href='#'
          className={`rounded-full flex justify-center items-center px-6 py-[0.2rem] hover:bg-[rgba(255,255,255,0.1)] hover:text-white ${
            darkMode ? '' : 'currentColorScheme'
          }`}
        >
          <i className='fa-regular fa-sun mr-2' /> light
        </a>
        <a
          onClick={toggleDarkMode}
          href='#'
          className={`rounded-full flex justify-center items-center px-6 py-[0.2rem] hover:bg-[rgba(255,255,255,0.1)] hover:text-white ${
            darkMode ? 'currentColorScheme' : ''
          }`}
        >
          <i className='fa-regular fa-moon mr-2' /> dark
        </a>
      </div>
    </nav>
  )
}
