import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import useSWR from 'swr';
import WineCard from '../components/WIneCard';
import { WineObj } from '../Interfaces/WineInterface';
import { Pagination } from '@mui/material';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

const Home: NextPage = () => {
  const [page, setPage] = useState(1);
  const url = `https://wine-back-test.herokuapp.com/products?page=${page}&limit=10`;
  const { data, error } = useSWR(url, fetcher);
  
  if (error) return <div>falhou ao carregar</div>;
  if (!data) return <div>carregando...</div>;

  console.log(data);
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

        <Pagination
          count={data.totalPages}
          color='primary'
          page={page}
          onChange={(_e, p) => setPage(p)}
          showFirstButton={true}
          showLastButton={true}
        />
      </main>
    </div>
  );
};

export default Home;
