import Context from './context';
import React, { useState } from 'react';
import { ScriptProps } from 'next/script';
import { WineCart } from '../Interfaces/WineInterface';

const Provider = ({ children } : ScriptProps ) => {
  const [cart, setCart] = useState<WineCart[]>([]);

  const store = {
    cart,
    setCart
  };

  return (
    <Context.Provider value={ store }>
      { children }
    </Context.Provider>
  );
};

export default Provider;
