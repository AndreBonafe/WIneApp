import Image from 'next/image';
import { WineObj } from '../Interfaces/WineInterface'; 

const WineCard = ({ wine }: { wine: WineObj }) => {
  return (
    <div>
      <Image
        src={wine.image}
        alt={`${wine.name}-image`}
        width={232.5}
        height={350.5}
      />
      <p>{wine.name}</p>
      <p>
        <span>{`R$${wine.price} `}</span>
        <span>{`  ${wine.discount}%OFF!`}</span>
      </p>
      <p>
        <span>SÓCIO WINE</span>
        <span>{`  R$${wine.priceMember}`}</span>
      </p>
      <p>
        <span>NÃO SÓCIO</span>
        <span>{`  R$${wine.priceNonMember}`}</span>
      </p>
      <button type='button'>ADICIONAR</button>
    </div>
  );
};

export default WineCard;