import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
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
  @media (max-width: 414px) {
    box-shadow: 0px 1px 1px 0px #C3C3C3;
  }
  display: flex;
  justify-content: space-between;
  background-color: white;

  .btnFold {
    align-self: start;
  }
  @media (min-width: 415px) {
    justify-content: space-evenly;
    box-shadow: 0px 1px 1px 0px #C3C3C3;
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
  }

  @media (min-width: 415px) {
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 60%;
  }
`;

const HeaderImages = styled.div`
  display: flex;
  align-self: center;
  width: 150px;
  justify-content: space-evenly;
`;

const StyledInput = styled.input`
  width: 100%;
  margin-right: 5px;
  align-self: center;
`;

const Header = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { cart, setNameFilter } = useContext(Context);

  const onChangeFunc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value);
  };

  return (
    <StyledHeader>
      {window.innerWidth <= 414 
        && (
          <AiOutlineMenuUnfold
            onClick={() => setShowMenu(true)}
            size={50}
          />)}
      {window.innerWidth <= 414 ? 
        showMenu && (
          <StyledHeaderLinks className="links">
            <AiOutlineMenuFold 
              onClick={() => setShowMenu(false)}
              className="btnFold"
              size={50}
            />
            <h5>MENU</h5>
            <Link className="menulink" href='/clube'>
              <span className="linkp">Clube</span>
            </Link>
            <Link className="menulink" href='/loja'>
              <span className="linkp">Loja</span>
            </Link>
            <Link className="menulink" href='/produtores'>
              <span className="linkp">Produtores</span>
            </Link>
            <Link className="menulink" href='/ofertas'>
              <span className="linkp">Ofertas</span>
            </Link>
            <Link className="menulink" href='/eventos'>
              <span className="linkp">Eventos</span>
            </Link>
          </StyledHeaderLinks>
        ) : (
          <StyledHeaderLinks className="links">
            <Link className="menulink" href='/clube'>
              <span className="linkp">Clube</span>
            </Link>
            <Link className="menulink" href='/loja'>
              <span className="linkp">Loja</span>
            </Link>
            <Link className="menulink" href='/produtores'>
              <span className="linkp">Produtores</span>
            </Link>
            <Link className="menulink" href='/ofertas'>
              <span className="linkp">Ofertas</span>
            </Link>
            <Link className="menulink" href='/eventos'>
              <span className="linkp">Eventos</span>
            </Link>
          </StyledHeaderLinks>
        )}
      <Image 
        src="/wine.svg"
        alt="Wine-logo"
        height={50}
        width={50}
        className="wine-logo"
      />
      <HeaderImages className='header-images'>
        <AiOutlineSearch
          onClick={ () => setShowSearchBar(!showSearchBar) }
          size={35}
        />
        {showSearchBar && (
          <StyledInput type="text" onChange={onChangeFunc} />
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
                <span>{cart.reduce((acc, curr) => acc + curr.quantity, 0)}</span>
              </div>
            </Link>
          </HeaderImages>
        )}
      </HeaderImages>
    </StyledHeader>
  );
};

export default Header;