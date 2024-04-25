// import { User } from '../common/types'
import { TopContentProps } from '../common/types'

export const TopContent: React.FC<TopContentProps> = ({ username, imageUrl }): any => {
  return (
    <div className='flex justify-between '>
      <h2 className='text-xl font-semibold'>
        Welcome back, {username} ✌️
      </h2>
      <div className='flex items-center'>
        <a href='' className='mr-2'>
          <svg
            className='icon icon-tabler icon-tabler-search'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='rgba(255,255,255,0.7)'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0' />
            <path d='M21 21l-6 -6' />
          </svg>
        </a>
        <a href='' className='mr-2'>
          <svg
            className='icon icon-tabler icon-tabler-bell'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='rgba(255,255,255,0.7)'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6' />
            <path d='M9 17v1a3 3 0 0 0 6 0v-1' />
          </svg>
        </a>
        <span className='flex items-center'>
          <svg
            className='icon icon-tabler icon-tabler-calendar'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='rgba(255,255,255,0.7)'
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
          <p className='font-semibold text-[rgba(255,255,255,0.3)] ml-2'>
            05 Jan 2024
          </p>
          <img
            /* className='rounded-full size-8 ml-4' */
            className='rounded-full size-10 ml-4'
            src={imageUrl}
            alt='Imagen de perfil'
          />
        </span>
      </div>
    </div>
  )
}
