import Image from 'next/image'
import React from 'react'

import errorIcon from './../../../public/images/icons/msg_icon_red.svg';


export default function ErrorMsg({message}) {
  return (
    <div className='flex'>
        <Image className='pr-1' src={errorIcon} />
        <div className='text-[12px] text-[#ff1919]'>{message}</div>
    </div>
  )
}
