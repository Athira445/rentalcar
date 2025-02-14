import React from 'react'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-md px-6 md:px-10 lg:px-30'>
      { /*----------------left side--------*/} 
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-30 m-auto md:py-[5vw] md:m-[40px]'>
           <p className='text-2xl md:text-4xl lg:text-4xl text-white fot-semibold leading-tight md:leading-tight lg:leading-tight '>
           Ride Ready With <br/> Reliable Car Rentals
           </p>
           <div>
            <p>
            Reliable car rentals for every journey, <br/> offering comfort and convenience at your fingertips.
            </p>
           </div>
           <a href="/register" className='flex items-center gap-2 bg-white px-8 py-3 rounded full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300  '>
            BOOK CAR <img src='' alt="" />
            </a>
        </div>
        { /*----------------right side--------*/} 
        <div className='md:w-1/2 relative'>
          
        </div>
        <div className='md:w-1/2 relative'>
          <img className='w-90 md:absolute bottom-2 h-auto rounded-sm' src='blue1.png' alt="" />
        </div>

        
    </div>
  )
}

export default Header