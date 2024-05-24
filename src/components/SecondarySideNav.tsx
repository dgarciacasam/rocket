import '../css/SecondarySideNav.css'
import * as types from 'src/common/types'
import { updateParams } from '@/common/utils'
import { useSearch } from 'wouter'
import { useEffect } from 'react'
interface Props {
  handlerIsShown: () => void
  isShown: boolean
  data: types.Project[]
}

export const SecondarySideNav = (props: Props) => {
  const search = useSearch()
  const isNavOpen = (): void => {
    props.handlerIsShown()
  }

  return (
    <div className={'fixed flex items-center justify-center h-screen  ' + (!props.isShown ? ' w-0 ml-0' : ' ml-20 w-72 ')}>
      <nav className={'bg-[#222327] w-72 px-8 h-screen justify-between py-[1.5rem] fixed lg:flex lg:flex-col' + (!props.isShown ? ' invisible' : ' ')}>
        <div className='flex flex-col'>
          <div className='flex justify-between items-start mb-3'>
            <h1 className='text-2xl font-semibold'>Proyectos</h1>
            <a className='h-full flex hover:bg-white' href='create-project'>
              <i className='fa-solid fa-plus self-center' />
            </a>
          </div>

          <div className='flex flex-col text-left'>
            <button className='button' key={0} onClick={() => { updateParams({ project: 'all' }, search) }}>
              Todos los proyectos
            </button>
            {Array.isArray(props.data)
              ? (
                props.data.map((project: types.Project) => (
                  <button className='button' key={project.id} onClick={() => { updateParams({ project: project.id }, search) }}>
                    {project.name}
                  </button>
                ))
              )
              : (
                <></>
              )}
          </div>
        </div>
      </nav>
      <button onClick={isNavOpen} className={'button flex items-center justify-center w-auto min-w-12 h-12 px-2 hover:rounded-none hover:bg-transparent ' + (!props.isShown ? ' ml-48' : ' ml-80 ')}>
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
