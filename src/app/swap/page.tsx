import { SwapForm } from '@/components/SwapForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Swap",
};

export default function Swap() {
  return (
    <>
      <main>
        <div className='flex justify-center items-center h-[800px]'>
          <div className='m-auto block w-[480px]'>
            <SwapForm />
          </div>
        </div>
      </main>
    </>
  )
}
