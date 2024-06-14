import React, { useRef, useState } from 'react'
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop'
import * as types from '@/common/types'
import { changeProfilePic } from '@/common/Services'

interface ImageCropperProps {
  isModalOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
  user: types.User
  setCroppedImg: (image: string) => void

  setCrop: (crop: Crop) => void
  crop: Crop | undefined
  imgSrc: string | undefined
}

const ASPECT_RATIO = 1

const centerAspectCrop = (
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) => {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}

export const ImageCropper: React.FC<ImageCropperProps> = ({ isModalOpen, setIsModalOpen, user, setCroppedImg, setCrop, crop, imgSrc }) => {
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const imgRef = useRef<HTMLImageElement>(null)
  const blobUrlRef = useRef('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)

  if (!isModalOpen) {
    return <></>
  }

  const onCropClick = async () => {
    const image = imgRef.current
    const previewCanvas = previewCanvasRef.current
    if ((image == null) || (previewCanvas == null) || (completedCrop == null)) {
      throw new Error('Crop canvas does not exist')
    }
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const offscreen = new OffscreenCanvas(completedCrop.width, completedCrop.height)
    const ctx = offscreen.getContext('2d')
    if (ctx != null) {
      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      )
      const blob = await offscreen.convertToBlob({ type: 'image/png' })
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current)
      }
      blobUrlRef.current = URL.createObjectURL(blob)

      setCroppedImg(blobUrlRef.current)
      setIsModalOpen(false)

      const file = new File([blob], 'profile-pic.png', { type: 'image/png' })
      await changeProfilePic(user.id, file)
    } else {
      throw new Error('No se pudo obtener el contexto 2D del OffscreenCanvas')
    }
  }

  function onImageLoad (e: React.SyntheticEvent<HTMLImageElement>): void {
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height, ASPECT_RATIO))
  }

  return (
    <div className='swal2-container swal2-center swal2-backdrop-show'>
      <div
        aria-labelledby='swal2-title'
        aria-describedby='swal2-html-container'
        className='swal2-popup swal2-modal swal2-show grid bg-[#111215]'
        tabIndex={-1}
        role='dialog'
        aria-live='assertive' aria-modal='true'
      >

        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {!!imgSrc && (
            <><ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={ASPECT_RATIO}
              circularCrop
              minHeight={100}
            >
              <img
                ref={imgRef}
                alt='Crop me'
                src={imgSrc}
                onLoad={onImageLoad}
              />
            </ReactCrop>
            </>
          )}
          {!(completedCrop == null) && (
            <canvas
              ref={previewCanvasRef}
              style={{
                display: 'none ',
                width: completedCrop.width,
                height: completedCrop.height
              }}
            />
          )}

        </div>
        <div className='swal2-actions flex '>
          <div className='swal2-loader' />
          <button type='button' className='swal2-confirm swal2-styled swal2-default-outline inline-block' style={{ backgroundColor: '#3085d6' }} onClick={onCropClick}>Guardar avatar</button>
          <button type='button' className='swal2-cancel swal2-styled swal2-default-outline inline-block' onClick={() => setIsModalOpen(false)}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
