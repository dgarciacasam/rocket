import { TopContentProps } from '../common/types'

export const TopContent: React.FC<TopContentProps> = ({ username, imageUrl }): any => {
  const today = new Date()
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  return (
    <div className='flex justify-between '>
      <div className='flex items-center w-[70%] lg:w-auto'>
        <h2 className='text-xl font-semibold'>
          Bienvenido de nuevo, {username} ✌️
        </h2>
      </div>
      <div className='flex items-center'>
        <span className='flex items-center'>
          <p className='hidden lg:flex font-semibold text-[rgba(255,255,255,0.3)] ml-2'>
            {today.getDate()} de {meses[today.getMonth()]} de {today.getFullYear()}
          </p>
          <img
            className='rounded-full size-12 lg:ml-4'
            src={imageUrl}
            alt='Imagen de perfil'
          />
        </span>
      </div>
    </div>
  )
}
