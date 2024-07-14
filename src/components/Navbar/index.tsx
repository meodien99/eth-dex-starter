'use client'
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link'
import { Logo } from '../Logo';
import { navigations } from '@/config';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Button, Modal, Navbar as DaisyNavbar } from '../react-daisyui';
import { ChainSelect } from '../ChainSelect';
import { WalletConnect } from '../WalletConnect';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const activeSegment = useSelectedLayoutSegment();

  const toggleModal = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const changeBackground = () => {
    if (window.scrollY >= 66) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  useEffect(() => {
    changeBackground()
    window.addEventListener("scroll", changeBackground)
  })


  return (
    <header className="fixed top-0 z-10 w-full">
      <DaisyNavbar className={`${isScrolled ? 'bg-gray-900' : 'bg-transparent'} transition-all mx-auto flex items-center justify-between p-5 lg:px-8`} aria-label="Global">
        <DaisyNavbar.Start className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Name</span>
            <Logo />
          </Link>
          <div className='pl-10'>
            <div className="flex lg:hidden">
              {!mobileMenuOpen && (
                <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
                  onClick={toggleModal}
                >
                  <span className="sr-only">Open main menu</span>
                  <i className="fas fa-bars"></i>
                </button>
              )}
            </div>
            <div className="hidden lg:flex lg:space-x-8 lg:py-2">
              {navigations.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    activeSegment === item.activeSegment
                      ? 'text-green-400'
                      : 'text-gray-400 hover:bg-green-700 hover:text-white',
                    'px-3 py-2 rounded-md text-md font-medium transition-all'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </DaisyNavbar.Start>
        <DaisyNavbar.End>
          <ChainSelect expanded={false} />
          <WalletConnect />
        </DaisyNavbar.End>
      </DaisyNavbar>
      <Modal.Legacy className="lg:hidden" open={mobileMenuOpen}>
        <Modal.Header className='mb-1'>
          <div className="flex items-center justify-between">
            <h4 className='font-bold'>Menu</h4>
            <Button
              color='ghost'
              className="rounded-md p-1 text-gray-300 hover:bg-transparent"
              onClick={toggleModal}
            >
              <span className="sr-only">Close menu</span>
              <i className="fas fa-times" />
            </Button>
          </div>
        </Modal.Header>
        <Modal.Body className="w-full overflow-y-auto">
          <div className="mt-6 flow-root text-center w-full">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigations.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      activeSegment === item.activeSegment
                        ? 'text-green-500'
                        : 'text-gray-800',
                      'block rounded-lg px-3 py-2 text-base font-semibold leading-7hover:underline'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal.Legacy>
    </header>
  );
}