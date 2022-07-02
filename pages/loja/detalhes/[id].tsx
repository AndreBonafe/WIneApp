import { useRouter } from 'next/router';
import useSWR from 'swr';
import Header from '../../../components/Header';
import { WineObj } from '../../../Interfaces/WineInterface';
import Context from '../../../context/context';
import { useContext } from 'react';

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

  const { cart } = useContext(Context);

  const url = 'https://wine-back-test.herokuapp.com/products';
  const { data, error } = useSWR(url, fetcher);

  if (error) return <div>falhou ao carregar</div>;
  if (!data) return <div>carregando...</div>;

  const wine: WineObj = data.items.find((e: WineObj) => e.id === Number(id));

  return (
    <div>
      <Header cart={cart}/>
      {wine.name}
    </div>
  );
};

export default Detail;