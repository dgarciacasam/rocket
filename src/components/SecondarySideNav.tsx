import '../css/SecondarySideNav.css'

function toggleClass (event: React.MouseEvent<HTMLButtonElement>): void {
  ; (event.target as Element).classList.toggle('button-active')
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

interface Props {
  handlerIsShown: () => void
  isShown: boolean
}

export const SecondarySideNav = (props: Props) => {
  const teams: string[] = ['Loh mejoreh', 'Sosio te rajo', 'Equipito 2024 🔥']
  const projects: string[] = ['Proyecto 1', 'Proyecto 2', 'Proyecto 3']
  const showSidenav: boolean = props.isShown

  const isNavOpen = (): void => {
    props.handlerIsShown()
  }

  return (
    <div className={'fixed flex items-center justify-center h-screen  ' + (!showSidenav ? ' w-0 ml-0' : ' ml-20 w-72 ')}>
      <nav className={'bg-[#222327] w-72 px-8 h-screen justify-between py-[1.5rem] fixed lg:flex lg:flex-col' + (!showSidenav ? ' invisible' : ' ')}>
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
      </nav>
      <button onClick={isNavOpen} className={'flex items-center justify-center w-auto min-w-12 h-12 px-2 hover:rounded-none hover:bg-transparent' + (!showSidenav ? ' ml-48' : ' ml-80 ')}>
        <svg
          className='icon icon-tabler icon-tabler-chevron-compact-left'
          width='32'
          height='32'
          viewBox='0 0 24 24'
          strokeWidth='1'
          stroke='#F2EBE3'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M11 4l3 8l-3 8' />
        </svg>
      </button>
    </div>
  )
}
