import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { 
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineMenuUnfold,
  AiOutlineMenuFold,
} from 'react-icons/ai';
import Context from '../context/context';
import styled from 'styled-components';

const StyledHeader = styled.div`
  margin-bottom: 8px;
  @media (max-width: 414px) {
    box-shadow: 1px 2px 7px 3px #8C8C8C;
  }
  display: flex;
  justify-content: space-between;
  background-color: white;

  .btnFold {
    align-self: start;
  }
  @media (min-width: 415px) {
    justify-content: space-evenly;
    box-shadow: 1px 2px 7px 3px #8C8C8C;
    background-color: white;

    .wine-logo {
      order: 0;
    }
  
    .links {
      order: 1;
    }

    .header-images {
      order: 2;
    }

    .header-images:hover {
      cursor: pointer;
    }

    .wine-logo-img:hover {
      cursor: pointer;
    }
  }
`;

const StyledHeaderLinks = styled.div`
  @media (max-width: 414px) {
    display: flex;
    flex-direction: column;
    position: absolute;
    background-color: white;
    height: 100%;
    width: 60%;
    z-index: 10;
    box-shadow: 1px 0px 5px 1px #C3C3C3;
  
    .linkp {
      padding: 15%;
      font-size: 1.5em;
    }
  
    h5 {
      font-size: 1.5em;
      position: absolute;
      margin-left: 40%;
      margin-top: 10px;
    }

    .selected {
      font-size: 200%;
      font-weight: bold;
      color: #c81a78;
    }
  }

  @media (min-width: 415px) {
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 60%;

    .selected {
      font-size: 180%;
      font-weight: bold;
      color: #c81a78;
    }

    .linkp:hover {
      font-size: 180%;
      font-weight: bold;
      color: #c81a78;
      cursor: pointer;
    }
  }
`;

const HeaderImages = styled.div`
  display: flex;
  align-self: center;
  width: 150px;
  justify-content: space-evenly;

  @media (min-width: 415px) {
    width: 300px;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  margin-right: 5px;
  align-self: center;
  @media (min-width: 415px) {
    height: 35px;
    margin-left: 15px;
    border: none;
    border-radius: 15px;
    box-shadow: 1px 0px 5px 1px #C3C3C3;
  }
`;

const Header = ({ page } : { page: string }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [windowSize, setWindowSize] = useState(0);
  const { cart, setNameFilter } = useContext(Context);

  const onChangeFunc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value);
  };

  useEffect(() => {
    setWindowSize(window.innerWidth);
  }, []);

  if (windowSize === 0) return <p>Carregando...</p>; 

  return (
    <StyledHeader>
      {windowSize <= 414 
        && (
          <AiOutlineMenuUnfold
            onClick={() => setShowMenu(true)}
            size={50}
          />)}
      {windowSize <= 414 ? 
        showMenu && (
          <StyledHeaderLinks className="links">
            <AiOutlineMenuFold 
              onClick={() => setShowMenu(false)}
              className="btnFold"
              size={50}
            />
            <h5>MENU</h5>
            <Link className="menulink" href='/clube'>
              <span 
                className={page === 'clube' ? 'linkp selected' : 'linkp'}
              >
                Clube
              </span>
            </Link>
            <Link className="menulink" href='/loja'>
              <span 
                className={page === 'loja' ? 'linkp selected' : 'linkp'}
              >
                Loja
              </span>
            </Link>
            <Link className="menulink" href='/produtores'>
              <span 
                className={page === 'produtores' ? 'linkp selected' : 'linkp'}
              >
                Produtores
              </span>
            </Link>
            <Link className="menulink" href='/ofertas'>
              <span 
                className={page === 'ofertas' ? 'linkp selected' : 'linkp'}
              >
                Ofertas
              </span>
            </Link>
            <Link className="menulink" href='/eventos'>
              <span 
                className={page === 'eventos' ? 'linkp selected' : 'linkp'}
              >
                Eventos
              </span>
            </Link>
          </StyledHeaderLinks>
        ) : (
          <StyledHeaderLinks className="links">
            <Link className="menulink" href='/clube'>
              <span 
                className={page === 'clube' ? 'linkp selected' : 'linkp'}
              >
                Clube
              </span>
            </Link>
            <Link className="menulink" href='/loja'>
              <span 
                className={page === 'loja' ? 'linkp selected' : 'linkp'}
              >
                Loja
              </span>
            </Link>
            <Link className="menulink" href='/produtores'>
              <span 
                className={page === 'produtores' ? 'linkp selected' : 'linkp'}
              >
                Produtores
              </span>
            </Link>
            <Link className="menulink" href='/ofertas'>
              <span 
                className={page === 'ofertas' ? 'linkp selected' : 'linkp'}
              >
                Ofertas
              </span>
            </Link>
            <Link className="menulink" href='/eventos'>
              <span 
                className={page === 'eventos' ? 'linkp selected' : 'linkp'}
              >
                Eventos
              </span>
            </Link>
          </StyledHeaderLinks>
        )}
      <Link href="/">
        <div className="wine-logo">
          <Image 
            src="/wine.svg"
            alt="Wine-logo"
            height={windowSize >= 415 ? 100 : 50}
            width={windowSize >= 415 ? 100 : 50}
            className="wine-logo-img"
          />
        </div>
      </Link>
      <HeaderImages className='header-images'>
        <AiOutlineSearch
          onClick={ () => setShowSearchBar(!showSearchBar) }
          size={35}
          data-cy="search-icon"
        />
        {showSearchBar && (
          <StyledInput
            type="text"
            onChange={onChangeFunc}
            data-cy="search-input"
          />
        )}
        {!showSearchBar && (
          <HeaderImages>
            <Link href='/perfil'>
              <div>
                <AiOutlineUser size={35}/>
              </div>
            </Link>
            <Link href='/carrinho'>
              <div>
                <AiOutlineShoppingCart size={35}/>
                <span data-cy="cart-total-itens">
                  {cart.reduce((acc, curr) => acc + curr.quantity, 0)}
                </span>
              </div>
            </Link>
          </HeaderImages>
        )}
      </HeaderImages>
    </StyledHeader>
  );
};

export default Header;