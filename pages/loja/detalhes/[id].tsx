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

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

const Detail = () => {
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
    <div>
      <Head>
        <title>WineApp</title>
        <meta name="description" content="WineApp" />
        <link rel="icon" href="/WineApp.ico" />
      </Head>

      <Header cart={cart}/>

      <Link href='/loja'>
        <p>{'< VOLTAR'}</p>
      </Link>

      <Image
        src={wine.image}
        alt={`${wine.name}-image`}
        width={232.5}
        height={350.5}
      />
      <span>{`Vinhos > ${wine.country} > ${wine.region}`}</span>
      <h2>{wine.name}</h2>
      <section>
        <Image 
          unoptimized
          loader={() => wine.flag}
          src={wine.flag}
          alt={`${wine.country} flag`}
          height={30}
          width={30}
        />
        <span>{wine.country}</span>
        <span>{wine.type}</span>
        <span>{wine.classification}</span>
        <span>{wine.size}</span>
        <ReactStars 
          count={5}
          size={25}
          value={wine.rating}
          edit={false}
        />
        <span>{`(${wine.avaliations})`}</span>
      </section>
      <section>
        <h4>R$</h4>
        <h2>{wine.priceMember.toFixed(2).replace('.', ',')}</h2>
        <h4>NÃO SÓCIO R${wine.priceMember.toFixed(2).replace('.', ',')}/UN.</h4>
      </section>
      <section>
        <h4>Comentário do Sommelier</h4>
        <p>{wine.sommelierComment}</p>
      </section>
      <div>
        <AiOutlineMinusCircle onClick={ () => onClickMinus() } />
        <p>{cartItem ? cartItem.quantity : 0}</p>
        <AiOutlinePlusCircle onClick={ () => onClickPlus() } />
        <Link href='/loja'>
          <p>ADICIONAR</p>
        </Link>
      </div>
    </div>
  );
};

export default Detail;