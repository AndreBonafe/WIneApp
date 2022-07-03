import Image from 'next/image';
import { WineCart, WineObj } from '../Interfaces/WineInterface'; 
import React, { useContext } from 'react';
import Link from 'next/link';
import Context from '../context/context';
import styled from 'styled-components';

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  justify-content: center;

  @media(min-width: 415px) {
    height: 510px;
    padding: 20px;
  }
`;

export const StyledButton = styled.button`
  width: 100%;
  color: white;
  height: 30px;
  border: none;
  margin: 0px 5px 15px 0px;
  background-color: #7ebc43;
  border-radius: 2px;

  @media(min-width: 415px) {
    margin-top: 15px;
  }
`;

export const DiscountSpan = styled.span`
  color: white;
  background-color: #f79552;
  padding: 2px;
  border-radius: 2px;
`;

const MiniPrice = styled.span`
  color: gray;
  padding: 2px;
  border-radius: 2px;
  font-size: 11px;
  text-decoration: line-through;
  .detailnon {
    text-decoration: none;
  }
`;

export const PartnerSpan = styled.span`
  color: gray;
  padding: 2px;
  border-radius: 2px;
  font-size: 11px;
`;

export const PriceSpan = styled.span`
  color: #c81a78;

  .cifrão {
    font-size: 12px;
  }

  .price {
    font-weight: bold;
  }
`;

const WineCard = ({ wine }: { wine: WineObj }) => {

  const { cart, setCart } = useContext(Context);

  const localCart: WineCart[] | [] = JSON.parse(localStorage.getItem('cart') || '[]');

  return (
    <div 
      className="winecard"
      data-cy={`card-${wine.id}`}
    >
      <StyledCard>
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
              <MiniPrice>{`R$${wine.price.toFixed(2).replace('.', ',')} `}</MiniPrice>
              <DiscountSpan>{`  ${wine.discount}%OFF!`}</DiscountSpan>
            </p>
            <p>
              <PartnerSpan>SÓCIO WINE</PartnerSpan>
              <PriceSpan>
                <span className="cifrão">R$</span>
                <span className="price">
                  {wine.priceMember.toFixed(2).replace('.', ',')}
                </span>
              </PriceSpan>
            </p>
            <p>
              <PartnerSpan>NÃO SÓCIO</PartnerSpan>
              <PartnerSpan>
                {`  R$${wine.priceNonMember.toFixed(2).replace('.', ',')}`}
              </PartnerSpan>
            </p>
          </div>
        </Link>
      </StyledCard>
      <StyledButton 
        type='button'
        data-cy={`add-btn-${wine.id}`}
        onClick={() => {
          if (!cart.some((e) => e.id === wine.id)) {
            const objCart: WineCart = { ...wine, quantity: 1 };
            localStorage.setItem('cart', JSON.stringify([...cart, objCart]));
            setCart([...cart, objCart ]);
          } else {
            const wineIndex = localCart.findIndex((e) => e.id === wine.id);
            localCart[wineIndex].quantity += 1;
            localStorage.setItem('cart', JSON.stringify(localCart));
            setCart(localCart);
          }
        }}
      >
          ADICIONAR
      </StyledButton>
    </div>
  );
};

export default WineCard;