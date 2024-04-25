import { Card } from './Card'
import { TopContent } from './TopContent'
import styles from '../css/Content.module.css'
import { useEffect, useState } from 'react'
import * as types from '../common/types'
import { getProfilePic } from '../common/Utils'

export interface Props {
  user: types.User
}

export const Content: React.FC<Props> = ({ user }) => {
  const [columns, setColumns] = useState<types.Column[]>()
  const [imageUrl, setImageUrl] = useState('https://github.com/saddxni.png')

  const getColumns = (): void => {
    fetch(
      `http://localhost:8080/column/${user.id}`,
      {
        method: 'GET'
      }
    )
      .then(async (response) => {
        if (response.status === 200) {
          return await response.json()
        }
      })
      .then((data) => {
        if (data != null) {
          setColumns(data)
        }
      }).catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (user != null) {
      getColumns()

      const fetchProfilePic = async (): Promise<void> => {
        try {
          const url = await getProfilePic(user.id) // Asegúrate de tener userId definido
          setImageUrl(url)
        } catch (error) {
          console.error('Error fetching profile picture:', error)
        }
      }

      fetchProfilePic()
    }
  }, [user])

  return (
    <div>
      <TopContent username={user.name} imageUrl={imageUrl} />
      <section className=' flex flex-col pt-4'>
        <section className='flex justify-between border-b-2 border-solid border-[rgba(255,255,255,0.1)] mb-6'>
          <div className='flex'>
            <button className={styles.active}>Board View</button>

            <button className='flex items-center'>
              <svg
                className='icon icon-tabler icon-tabler-plus bg-[rgba(255,255,255,0.1)] rounded-full p-1 mr-2'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='#ffffff'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M12 5l0 14' />
                <path d='M5 12l14 0' />
              </svg>
              Add view
            </button>
          </div>
          <div className='flex justify-center'>
            <button>Filter</button>
            <button>Sort</button>
            <button>3puntos</button>
            <button>New template</button>
          </div>
        </section>
        <section className='grid md:grid-cols-3 gap-8 grid-cols-2 h-fit'>
          {columns !== undefined
            ? columns.map((column: types.Column) => (
              <Card
                key={column.id}
                title={column.name}
                id={column.id}
                datosTarjetas={column.taskList}
              />
            ))
            : ''}
        </section>
      </section>
    </div>
  )
}
