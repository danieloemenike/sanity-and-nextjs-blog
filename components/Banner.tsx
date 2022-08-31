import Image from 'next/image'
import React from 'react'



function Banner() {
  return (
    <div className="flex justify-between items-center py-10 bg-yellow-400  rounded-md shadow-md bg-gradient-to-r from-yellow-220 via-yellow-200 to-yellow-350">
        <div className='px-10 space-y-5'>
            <h1 className='text-5xl max-w-xl font-serif'> <i data-feather="underline"> Medium </i>  is a place to write, read and connect</h1>
            <h2 className='font-sans'> Its easy and free to post your thinking on any topic and connect with millions of reader</h2>
        </div>

        <div className='hidden md:inline-flex px-20 lg:h-full '>
        <Image src="/medium3.png" width="135" height="135" alt="medium logo"/> 
        </div>
    </div>
  )
}

export default Banner