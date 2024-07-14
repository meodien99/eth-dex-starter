'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Modal } from '@/components/react-daisyui';
import { IToken } from '@/app/types/TokenSwap.type';
import Image from 'next/image';
import classNames from 'classnames';

interface ITokenModalProps {
  tokens?: IToken[];
  open?: boolean;
  closeModal: () => void;
  onTokenSelect: (token: IToken) => void;
  selectedTokens?: (IToken | undefined)[];
}

export const TokenModal: React.FC<ITokenModalProps> = ({ tokens, open, closeModal, onTokenSelect }) => {
  const [filteredData, setFilteredData] = useState<IToken[]>([]);

  const onSearchFilter: React.ChangeEventHandler<HTMLInputElement> = useCallback((e: any) => {
    if (tokens) {
      const searchTerm = e.target.value.toLowerCase();
      const filtered = tokens.filter((o: IToken) => {
        return o.symbol.toLowerCase().indexOf(searchTerm) > -1 || o.name.toLowerCase().indexOf(searchTerm) > -1;
      });
      setFilteredData(filtered);
    }
  }, [tokens, setFilteredData])

  useEffect(() => {
    if (tokens) {
      setFilteredData(tokens);
    }
  }, [tokens]);


  return (
    <Modal.Legacy open={open}>
      <Modal.Header>
        <div className="flex items-center justify-between">
          <span>Tokens</span>
          <Button
            color='ghost'
            className="rounded-md p-1 text-gray-300 hover:bg-transparent"
            onClick={closeModal}
          >
            <span className="sr-only">Close</span>
            <i className="fas fa-times"/>
          </Button>
        </div>
      </Modal.Header>
      <Modal.Body className="w-full overflow-y-auto sm:ring-1 sm:ring-gray-900/10">
        <div className="mt-5 sm:mt-6">
          <div className="relative mt-2 rounded-md shadow-sm mx-4">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
              <i className="fas fa-search text-gray-200"/>
            </div>
            <input
              type="text"
              name="search"
              className="block w-full text-2xl text-white rounded-md border-0 py-2.5 pl-8 bg-gray-900 ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Search"
              onChange={onSearchFilter}
            />
          </div>
          {tokens && (
            <div className='flex flex-wrap gap-2 my-6 mx-4'>
              {tokens.filter((token) => !token.selected).slice(0, 5).map((token: IToken, index) =>
                <div key={index} onClick={() => { onTokenSelect(token) }}>
                  <Button className="bg-gray-600 rounded-xl">
                    <div className='flex'>
                      <Image className='rounded-full inline mr-2' alt={token.symbol} width={30} height={30} src={token.logo} />
                      <span className='text-lg mr-2 inline text-white'>{token.symbol}</span>
                    </div>
                  </Button>
                </div>
              )}
            </div>
          )}
          <ul role="list" className="divide-y divide-white/5 overflow-scroll max-h-[300px] ml-4 min-h-[200px]">
            {filteredData.map((item, index) => (
              <li key={index} className={classNames("py-4 cursor-pointer", {
                'text-gray-400 pointer-events-none cursor-not-allowed opacity-70': item.selected
              })} onClick={() => { !item.selected && onTokenSelect(item) }}>
                <div className="flex items-center gap-x-3">
                  <Image src={item.logo} alt={item.symbol} width={30} height={30} className="h-6 w-6 flex-none rounded-full bg-gray-800" />
                  <h3 className="flex-auto truncate text-sm font-semibold leading-6">{item.symbol}</h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Modal.Body>
    </Modal.Legacy>
  );
}