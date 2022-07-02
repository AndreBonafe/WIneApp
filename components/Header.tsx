import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { AiOutlineSearch, AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';
import Context from '../context/context';

const Header = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { cart, setNameFilter } = useContext(Context);

  const onChangeFunc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value);
  };

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
      <AiOutlineSearch onClick={ () => setShowSearchBar(!showSearchBar) }/>
      {showSearchBar && (
        <div>
          <input 
            type="text"
            onChange={onChangeFunc}
          />
        </div>
      )}
      <Link href='/perfil'>
        <AiOutlineUser />
      </Link>
      <Link href='/carrinho'>
        <div>
          <AiOutlineShoppingCart />
          <span>{cart.reduce((acc, curr) => acc + curr.quantity, 0)}</span>
        </div>
      </Link>
    </div>
  );
};

export default Header;