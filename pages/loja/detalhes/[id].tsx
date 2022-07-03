import { useRouter } from 'next/router';
import useSWR from 'swr';
import Header from '../../../components/Header';
import { WineCart, WineObj } from '../../../Interfaces/WineInterface';
import Context from '../../../context/context';
import { useContext, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import ReactStars from 'react-stars';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import Link from 'next/link';
import { NextPage } from 'next';
import styled from 'styled-components';
import { 
  DiscountSpan, PartnerSpan, PriceSpan, StyledButton 
} from '../../../components/WIneCard';

const StyledDetail = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f6f6f6;
  align-items: center;
  justify-content: space-between;

  h2 {
    text-align: center;
  }

  h4 {
    text-align: center;
  }

  @media (max-width: 414px) {
    padding: 0 15px 100px 15px;
  }

  @media (min-width: 415px) {
    padding: 0 15px 0 15px;
    display: flex;
    flex-direction: row;

    .wine-img {
      width: 500px;
    }

    .wine-description {
      width: 35%;
      margin-right: 60px;
      padding: 15px;
      display: flex;
      flex-direction: column;

      .wine-name {
        text-align: left;
        font-size: 20px;
      }

      .from {
        align-self: flex-start;
      }
    }

    .voltar {
      align-self: flex-start;
    }

    .price {
      font-size: 25px;
    }

    .some-comment {
      color: gray;
    }

    .flag {
      align-self: flex-start;
      margin-bottom: 50px;
    }
  }
`;

const PriceSection = styled.section`
  display: flex;
  align-items: center;
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100%;
  z-index: 10;
  height: 100px;
  background-color: white;
  box-shadow: 0px 1px 5px 1px #C3C3C3;

  .disc {
    position: absolute;
    top: -7px;
  }

  .prices {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
  }

  .big-price {
    font-size: 30px;
    padding-bottom: 5px;
  }

  .addbtn {
    height: 70%;
  }
`;

const SpanFrom = styled.span`
  padding-top: 15px;
  color: #c81a78;
  align-self: center;
`;

const StyledWineDetsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-right: 5px;
    margin-left: 5px;
  }

  .flag {
    display: flex;
    align-items: center;
  }
`;

const AddAndRemove = styled.div`
  display: flex;
  align-items: center;
  background-color: #7ebc43;
  padding: 15px 35px 15px 15px;
  border-radius: 18px;
  margin-bottom: 15px;
  height: 60px;
  color: white;
  .btn {
    margin: 0 5px 0 5px;
    width: 50px;
  }
  width: 55%;
`;

const MiniPrice = styled.span`
  color: gray;
  padding: 2px;
  border-radius: 2px;
  font-size: 11px;
  margin-left: 10px;
  }
`;

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

const Detail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { cart, setCart } = useContext(Context);
  

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, [setCart]);

  const url = 'https://wine-back-test.herokuapp.com/products';
  const { data, error } = useSWR(url, fetcher);

  if (error) return <div>falhou ao carregar</div>;
  if (!data) return <div>carregando...</div>;

  const wine: WineObj = data.items.find((e: WineObj) => e.id === Number(id));

  console.log(wine);

  const cartItem = cart.find((e) => e.id === Number(id));

  const localCart: WineCart[] | [] = JSON.parse(localStorage.getItem('cart') || '[]');

  const onClickPlus = () => {
    if (!cartItem) {
      const objCart: WineCart = { ...wine, quantity: 1 };
      localStorage.setItem('cart', JSON.stringify([...cart, objCart]));
      setCart([...cart, objCart ]);
    } else {
      const wineIndex = localCart.findIndex((e) => e.id === wine.id);
      localCart[wineIndex].quantity += 1;
      localStorage.setItem('cart', JSON.stringify(localCart));
      setCart(localCart);
    }
  };

  const onClickMinus = () => {
    if (cartItem) {
      if (cartItem.quantity === 1) {
        const cartWithoutThis = localCart.filter((e) => e.id !== wine.id);
        localStorage.setItem('cart', JSON.stringify(cartWithoutThis));
        setCart(cartWithoutThis);
        return;
      }
      const wineIndex = localCart.findIndex((e) => e.id === wine.id);
      localCart[wineIndex].quantity -= 1;
      localStorage.setItem('cart', JSON.stringify(localCart));
      setCart(localCart);
    }
  };

  return (
    <>
      <Head>
        <title>{wine.name}p</title>
        <meta name="description" content="WineApp" />
        <link rel="icon" href="/WineApp.ico" />
      </Head>

      <Header />

      <StyledDetail>
        {window.innerWidth >= 414 
            && (
              <Link href='/loja'>
                <p className='voltar'>{'< VOLTAR'}</p>
              </Link>
            )}
        {window.innerWidth >= 414 && (
          <Image
            src={wine.image}
            alt={`${wine.name}-image`}
            width={382}
            height={500}
            className="wine-img"
          />
        )}
        <div className="wine-description">
          <SpanFrom className='from'>
            {`Vinhos > ${wine.country} > ${wine.region}`}
          </SpanFrom>
          <h2 className="wine-name">{wine.name}</h2>
          <StyledWineDetsSection>
            <div className='flag'>
              <Image 
                unoptimized
                loader={() => wine.flag}
                src={wine.flag}
                alt={`${wine.country} flag`}
                height={30}
                width={30}
              />
              <p>{wine.country}</p>
              <p>{wine.type}</p>
              <p>{wine.classification}</p>
              <p>{wine.size}</p>
              <ReactStars 
                count={5}
                size={15}
                value={wine.rating}
                edit={false}
                className="stars"
              />
              <p>{`(${wine.avaliations})`}</p>
            </div>
            {window.innerWidth <= 414 && (
              <Image
                src={wine.image}
                alt={`${wine.name}-image`}
                width={232.5}
                height={350.5}
              />
            )}
          </StyledWineDetsSection>
          {window.innerWidth >= 414 ? (
            <section>
              <PriceSpan>
                <span className="cifrão">R$</span>
                <span className="price">
                  {wine.priceMember.toFixed(2).replace('.', ',')}
                </span>
              </PriceSpan>
              <br />
              <MiniPrice className='detailnon'>
                NÃO SÓCIO R${wine.priceMember.toFixed(2).replace('.', ',')}/UN.
              </MiniPrice>
            </section>) : (
            <PriceSection>
              <div className='prices'>
                <DiscountSpan className='disc'>{`  ${wine.discount}%OFF!`}</DiscountSpan>
                <MiniPrice>{`R$${wine.price.toFixed(2).replace('.', ',')} `}</MiniPrice>
                <PriceSpan className="big-price">
                  <span className="cifrão">R$</span>
                  <span className="price">
                    {wine.priceMember.toFixed(2).replace('.', ',')}
                  </span>
                </PriceSpan>
                <PartnerSpan>
                  {`PREÇO PARA NÃO SÓCIO R$${wine.priceNonMember}`}
                </PartnerSpan>
              </div>
              <StyledButton onClick={() => onClickPlus()} className="addbtn">
                ADICIONAR
              </StyledButton>
            </PriceSection>
          )}
          <section>
            <h4>Comentário do Sommelier</h4>
            <p className="some-comment">{wine.sommelierComment}</p>
          </section>
          {window.innerWidth >= 414
          && (
            <AddAndRemove>
              <AiOutlineMinusCircle 
                data-cy="detail-minus-btn"
                onClick={ () => onClickMinus() }
                className='btn'
              />
              <p data-cy="detail-qnty">{cartItem ? cartItem.quantity : 0}</p>
              <AiOutlinePlusCircle
                data-cy="detail-plus-btn"
                onClick={ () => onClickPlus() }
                className='btn'
              />
              <Link href='/loja'>
                <p>ADICIONAR</p>
              </Link>
            </AddAndRemove>
          )}
        </div>
      </StyledDetail>
    </>
  );
};

export default Detail;