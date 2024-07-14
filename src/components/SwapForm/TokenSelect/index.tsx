import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/react-daisyui';

interface ITokenSelectProps {
  symbol?: string;
  logo?: string;
  onClick: () => void
}

export const TokenSelect: React.FC<ITokenSelectProps> = ({ symbol, logo, onClick }) => {
  return (
    <div className='absolute top-1/2 -translate-y-1/2 right-[10px]'>
      <Button
        size='sm'
        className='rounded-full font-semibold px-1.5 py-1.5 text-sm'
        onClick={onClick}
      >
        <>
          {symbol && (
            <div className='flex justify-between items-center gap-1'>
              {logo && <Image className='inline rounded-full' alt={symbol} width={20} height={20} src={logo} />}
              <span className='text-sm inline'>{symbol}</span>
              <i className="fas fa-chevron-down"></i>
            </div>
          )}

          {!symbol && (
            <span className='text-sm'>Select Token</span>
          )}
        </>
      </Button>
    </div>
  )
}