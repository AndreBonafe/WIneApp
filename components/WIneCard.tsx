import Image from 'next/image';
import { WineCart, WineObj } from '../Interfaces/WineInterface'; 
import React, { Dispatch } from 'react';
import Link from 'next/link';

const WineCard = (
  { wine, cartSetter, cart }: {
    wine: WineObj, 
    cartSetter: Dispatch<React.SetStateAction<WineCart[]>>,
    cart: WineCart[]
  },
) => {

  const localCart: WineCart[] | [] = JSON.parse(localStorage.getItem('cart') || '[]');

  return (
    <div>
      <Link href={`/loja/detalhes/${wine.id}`}>
        <div>
          <Image
            src={wine.image}
            alt={`${wine.name}-image`}
            width={232.5}
            height={350.5}
          />
          <p>{wine.name}</p>
          <p>
            <span>{`R$${wine.price.toFixed(2).replace('.', ',')} `}</span>
            <span>{`  ${wine.discount}%OFF!`}</span>
          </p>
          <p>
            <span>SÓCIO WINE</span>
            <span>{`  R$${wine.priceMember.toFixed(2).replace('.', ',')}`}</span>
          </p>
          <p>
            <span>NÃO SÓCIO</span>
            <span>{`  R$${wine.priceNonMember.toFixed(2).replace('.', ',')}`}</span>
          </p>
        </div>
      </Link>
      <button 
        type='button'
        onClick={() => {
          if (!cart.some((e) => e.id === wine.id)) {
            const objCart: WineCart = { ...wine, quantity: 1 };
            localStorage.setItem('cart', JSON.stringify([...cart, objCart]));
            cartSetter([...cart, objCart ]);
          } else {
            const wineIndex = localCart.findIndex((e) => e.id === wine.id);
            localCart[wineIndex].quantity += 1;
            localStorage.setItem('cart', JSON.stringify(localCart));
            cartSetter(localCart);
          }
        }}
      >
          ADICIONAR
      </button>
    </div>
  );
};

export default WineCard;