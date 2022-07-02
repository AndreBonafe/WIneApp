import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { AiOutlineSearch, AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';
import Context from '../context/context';

const Header = () => {
  const { cart } = useContext(Context);

  return (
    <div>
      <Image 
        src="/wine.svg"
        alt="Wine-logo"
        height={50}
        width={50}
      />
      <Link href='/clube'>Clube</Link>
      <Link href='/loja'>Loja</Link>
      <Link href='/produtores'>Produtores</Link>
      <Link href='/ofertas'>Ofertas</Link>
      <Link href='/eventos'>Eventos</Link>
      <AiOutlineSearch />
      <AiOutlineUser />
      <AiOutlineShoppingCart />
      <span>{cart.reduce((acc, curr) => acc + curr.quantity, 0)}</span>
    </div>
  );
};

export default Header;