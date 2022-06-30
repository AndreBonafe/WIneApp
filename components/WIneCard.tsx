import { WineObj } from '../Interfaces/WineInterface'; 

const WineCard = ({ wine }: { wine: WineObj }) => {
  return (
    <div>
      <p>{wine.name}</p>
    </div>
  );
};

export default WineCard;