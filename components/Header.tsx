import Image from 'next/image';
import { AiOutlineSearch, AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';
import { WineCart } from '../Interfaces/WineInterface';

const Header = ({ cart } : { cart: WineCart[] }) => {
  return (
    <div>
      <Image 
        src="/wine.svg"
        alt="Wine-logo"
        height={50}
        width={50}
      />
      <p>Clube</p>
      <p>Loja</p>
      <p>Produtores</p>
      <p>Ofertas</p>
      <p>Eventos</p>
      <AiOutlineSearch />
      <AiOutlineUser />
      <AiOutlineShoppingCart />
      <span>{cart.reduce((acc, curr) => acc + curr.quantity, 0)}</span>
    </div>
  );
};

export default Header;