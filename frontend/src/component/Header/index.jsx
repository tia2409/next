import Image from 'next/image'
import React from 'react'

import LocaleSelect from '../LocaleSelect'

import MenuIcon from './../../../public/images/icons/sidebar_menu.svg'
import HeaderTitle from './../../../public/images/icons/rain_logo_horizontal.svg'
import Logout from './../../../public/images/icons/icon_login.svg'
import Mymenu from './../../../public/images/icons/icon_mymenu.svg'
import DefaultUser from './../../../public/images/icons/default_user.svg'

export default function Header({toggleSidebar}) {
  return (
    <div className='flex justify-between items-center w-full h-[72px] px-[20px] bg-black'>
        <div className='flex'>
            <Image src={MenuIcon} onClick={toggleSidebar} />
            <Image className='pl-4' src={HeaderTitle} />
        </div>
        <div className='flex justify-end items-center w-[600px]'>
            <div>
                <LocaleSelect />
            </div>
            <div>
                <Image src={Logout} />
            </div>
            <div className='pl-4'>
                <Image src={Mymenu} />
            </div>
            <div className='pl-4'>
                <Image className='rounded-full border-[#909090] bg-[#424242]' src={DefaultUser} />
            </div>
        </div>
    </div>
  )
}
