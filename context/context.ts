import { createContext } from 'react';
import { CartContextType } from '../Interfaces/WineInterface';

const defaultValue = {
  cart: [],
  setCart: () => {}
};

const Context = createContext<CartContextType>(defaultValue);

export default Context;