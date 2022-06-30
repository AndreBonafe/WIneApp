import type { NextPage } from 'next';
import Head from 'next/head';
import useSWR from 'swr';
import WineCard from '../components/WIneCard';
import { WineObj } from '../Interfaces/WineInterface';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

const Home: NextPage = () => {
  const url = 'https://wine-back-test.herokuapp.com/products?page=1&limit=10';
  const { data, error } = useSWR(url, fetcher);
  
  if (error) return <div>falhou ao carregar</div>;
  if (!data) return <div>carregando...</div>;

  return (
    <div>
      <Head>
        <title>WineApp</title>
        <meta name="description" content="WineApp" />
        <link rel="icon" href="/WineApp.ico" />
      </Head>

      <main>
        <p>{data.items.length} produtos encontrados</p>

        {data.items.map((e: WineObj) => (
          <WineCard wine={e} key={e.id}/>
        ))}
      </main>
    </div>
  );
};

export default Home;
