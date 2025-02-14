import React from 'react';
import carData from '../assets/data/carData';

const Topcar = () => {
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Variety Car To Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply Browse Through the Different Cars.</p>
      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {carData.slice(0, 10).map((item, index) => (
          <div
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
            key={index}
          >
            <img className='bg-blue-50' src={item.imgUrl} alt={item.carName} />
            <div className='p-4'>
              <p className='text-gray-900 text-lg font-medium'>{item.carName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topcar;
