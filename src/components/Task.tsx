import { useEffect, useState } from 'react'
import * as types from '../common/types'
import { API_HOST } from '@/config'
import { useDebounce } from '@uidotdev/usehooks'
import { Calendar } from '@/@/components/ui/calendar'
import { Button } from '@/@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/@/components/ui/popover'
import { cn } from '@/@/lib/utils'
import { format, isValid } from 'date-fns'
import { convertProfilePic } from '@/common/Services'
const DEBOUNCE_TIME = 500

export const Task: React.FC<types.Task> = ({ id, title, description, finishDate, onDeleteTask, users, columnId }) => {
  const [Title, setTitle] = useState(title)
  const [Description, setDescription] = useState(description)
  const [FinishDate, setFinishDate] = useState(finishDate)
  const [imagesUrl, setImagesUrl] = useState<types.ImageUrls>({})

  const debouncedTitle = useDebounce(Title, DEBOUNCE_TIME)
  const debouncedDescription = useDebounce(Description, DEBOUNCE_TIME)
  const debouncedFinishDate = useDebounce(FinishDate, DEBOUNCE_TIME)
  const handleDelete = (): void => {
    fetch(
      `${API_HOST}/task/${id}`,
      {
        method: 'DELETE'
      }
    ).then((response) => {
      console.log(response)
      if (response.ok && onDeleteTask !== undefined) {
        onDeleteTask(id)
      }
    }).catch((error) => { throw error })
  }

  useEffect(() => {
    const fetchProfilePics = async (): Promise<void> => {
      const imageUrlMap: types.ImageUrls = {}

      // Esperar a que todas las promesas se completen y almacenar las URLs de las imágenes
      await Promise.all(
        users.map(async (user) => {
          try {
            const url = convertProfilePic(user.profilePic)
            imageUrlMap[user.id] = url
          } catch (error) {
            console.error(`Error al obtener la imagen para el usuario ${user.id}:`, error)
          }
        })
      )

      // Actualizar el estado con las URLs de las imágenes
      setImagesUrl(imageUrlMap)
    }

    void fetchProfilePics()
  }, [users]) // Se ejecutará cada vez que users cambie

  useEffect(() => {
    const updateTask = (): void => {
      const newTask = {
        title: debouncedTitle !== '' ? debouncedTitle : title,
        description: debouncedDescription !== '' ? debouncedDescription : description,
        finishDate: debouncedFinishDate !== undefined ? debouncedFinishDate : finishDate,
        columnId
      }

      fetch(`${API_HOST}/task/${id} `, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(newTask),
        headers: { 'Content-Type': 'application/json' }
      }).then((response) => {
        console.log(response)
      }).catch((error) => { throw error })
    }

    // Llama a la función de actualización cuando cualquiera de las propiedades cambie
    if (
      (debouncedTitle !== '' && debouncedTitle !== title) ||
      (debouncedDescription !== '' && debouncedDescription !== description) ||
      (debouncedFinishDate !== undefined && debouncedFinishDate !== finishDate)
    ) {
      updateTask()
    }
  }, [debouncedTitle, debouncedDescription, debouncedFinishDate])

  return (
    <div className='bg-[#292b31] p-4 mb-3 rounded-xl mx-2' id={id.toString()}>
      <div>
        <div className='flex  justify-between'>
          <input
            type='text'
            className='font-bold text-pretty bg-[#292b31]'
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Escribe un nombre...'
          />
          <button
            className='flex justify-center items-center p-0 m-0 w-10 h-10 bg-[#24262c] rounded-full border-solid border-[2px] border-[rgba(255,255,255,0.1)] '
            onClick={handleDelete}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-trash'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M4 7l16 0' />
              <path d='M10 11l0 6' />
              <path d='M14 11l0 6' />
              <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
              <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
            </svg>
          </button>
        </div>
        <textarea
          className='font-bold text-pretty bg-[#292b31]'
          onChange={(e) => setDescription(e.target.value)}
          defaultValue={description}
        />

      </div>
      <div className='flex justify-between pt-4'>
        <div className='mt-2'>
          <p className='text-[rgba(255,255,255,0.7)] bg-[rgba(54,55,60,255)] rounded-full py-2 px-4 text-[14px] align-middle'>
            {
              (finishDate !== null) ? new Date(finishDate).toDateString() : 'Undefined'
            }
          </p>
        </div>
        <div className='flex'>
          {(users != null)
            ? users.map((user) => (
              <img
                key={user.id}
                className='rounded-full size-14 '
                src={imagesUrl[user.id]}
                alt='Imagen de perfil'
              />
            ))
            : ''}
          <button>
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
          </button>

        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              className={cn(
                'w-[280px] justify-start text-left font-normal',
                FinishDate === undefined && 'text-muted-foreground'
              )}
            >

              {isValid(FinishDate) ? format(FinishDate, 'PPP') : <span>Hola</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar
              mode='single'
              selected={FinishDate}
              onSelect={(date) => {
                if (date instanceof Date && !isNaN(date.getTime())) { // Verifica si date es una instancia de Date válida
                  setFinishDate(date) // Establece la fecha seleccionada
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
