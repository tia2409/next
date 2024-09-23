import Image from 'next/image'
import React from 'react'

import errorIcon from './../../../public/images/icons/msg_icon_red.svg';


export default function BasicMsg({message}) {
  return (
    <div className='flex'>
        <Image className='pr-1' src={errorIcon} width={18} height={18} alt='baisc-msg' />
        <div className='text-[12px] text-[#ff1919]'>{message}</div>
    </div>
  )
}
