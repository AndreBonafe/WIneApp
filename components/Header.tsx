import Image from 'next/image';
import { AiOutlineSearch, AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';

const Header = () => {
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
    </div>
  );
};

export default Header;