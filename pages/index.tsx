import type { NextPage } from 'next';
import Head from 'next/head';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useSWR from 'swr';
import WineCard from '../components/WIneCard';
import { WineCart, WineObj } from '../Interfaces/WineInterface';
import { Pagination } from '@mui/material';
import FilterSideBar from '../components/FIlterSidebar';
import Header from '../components/Header';

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
  const [filter, setFilter] = useState('0');
  const [cart, setCart] = useState<WineCart[]>([]);

  const url = `https://wine-back-test.herokuapp.com/products?page=${page}&limit=10&filter=${filter}`;
  const { data, error } = useSWR(url, fetcher);

  useEffect(() => {
    const selectedFilter = localStorage.getItem('selectedFilter');
    if(selectedFilter) setFilter(selectedFilter);
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);
  
  if (error) return <div>falhou ao carregar</div>;
  if (!data) return <div>carregando...</div>;
  return (
    <div>
      <Head>
        <title>WineApp</title>
        <meta name="description" content="WineApp" />
        <link rel="icon" href="/WineApp.ico" />
      </Head>

      <Header cart={cart}/>

      <aside id="sidebar">
        <FilterSideBar setter={setFilter} />
      </aside>
      <main>
        <p>{data.totalItems === 0 ? 'Nenhum produto encontrado' 
          : `${data.totalItems} produtos encontrados`}</p>

        {data.items.map((e: WineObj) => (
          <WineCard wine={e} key={e.id} cartSetter={setCart} cart={cart} />
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
