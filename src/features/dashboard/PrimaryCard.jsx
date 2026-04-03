import React from 'react';

export const PrimaryCard = () => (
  <div className='relative shrink-0 bg-linear-to-br from-[#c84bf5] to-[#7c14ff] rounded-3xl p-6 text-white shadow-[0_8px_30px_rgb(124,20,255,0.25)] overflow-hidden'>
    <div className='absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 blur-[2px]'></div>
    <div className='absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-white opacity-10 blur-[1px]'></div>
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-white opacity-5 blur-xl'></div>
    <div className='relative z-10'>
      <div className='flex justify-between items-center mb-8'>
        <span className='text-sm font-medium tracking-wide'>
          Primary Card
        </span>
        <span className='font-bold tracking-widest text-sm opacity-90 drop-shadow-sm'>
          CARD
        </span>
      </div>
      <div className='text-lg sm:text-2xl lg:text-xl xl:text-2xl tracking-widest sm:tracking-[0.15em] font-medium mb-8 font-mono drop-shadow-sm whitespace-nowrap'>
        **** **** **** 1234
      </div>
      <div className='flex justify-between items-end'>
        <div>
          <p className='text-[10px] uppercase tracking-wider opacity-75 mb-1'>
            Available Funds
          </p>
          <p className='font-bold text-sm xl:text-base whitespace-nowrap'>
            ₹ 3,97,298
          </p>
        </div>
        <div>
          <p className='text-[10px] uppercase tracking-wider opacity-75 mb-1'>
            Expires
          </p>
          <p className='font-bold text-sm'>01/37</p>
        </div>
        <div>
          <p className='text-[10px] uppercase tracking-wider opacity-75 mb-1'>
            CVV
          </p>
          <p className='font-bold text-sm'>123</p>
        </div>
      </div>
    </div>
  </div>
);
