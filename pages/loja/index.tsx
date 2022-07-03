import type { NextPage } from 'next';
import Head from 'next/head';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import WineCard from '../../components/WIneCard';
import { WineObj } from '../../Interfaces/WineInterface';
import { Pagination } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FilterSideBar from '../../components/FIlterSidebar';
import Header from '../../components/Header';
import Context from '../../context/context';
import styled from 'styled-components';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#f79552',
    },
    secondary: {
      main: '#c81a78',
    },
  },
});

const StyledHomeStore = styled.div`
  padding-top: 15px;
  background-color: #f6f6f6;
  @media (min-width: 415px) {
    display: flex;
    .sidebar {
      width: 360px;
    }
  }
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;

  .pagination {
    align-self: center;
    text-color: #c81a78;
  }
`;

const ProdutosEncontrados = styled.div`
  display: flex;
  color: gray;
  .number {
    margin-right: 5px;
    font-weight: bold;
    color: black;
  }
  justify-content: center;
  padding: 3px;
`;

const StyledCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;

  .winecard {
    width: 40%;
  }
  @media(min-width: 415px) {
    .winecard {
      width: 20%;
      margin: 5px;
    }

    .winecard-white:hover {
      cursor: pointer;
      width: 110%;
      box-shadow: -3px 12px 16px 3px rgba(200,26,120,0.18);
    }
  }
`;

const HomeStore: NextPage = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('0');

  const { setCart, nameFilter } = useContext(Context);

  const url = `https://wine-back-test.herokuapp.com/products?page=${page}&limit=10&filter=${filter}`;
  const { data, error } = useSWR(url, fetcher);

  useEffect(() => {
    const selectedFilter = localStorage.getItem('selectedFilter');
    if(selectedFilter) setFilter(selectedFilter);
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, [setCart]);
  
  if (error) return <div>falhou ao carregar</div>;
  if (!data) return <div>carregando...</div>;
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>WineApp - Loja</title>
        <meta name="description" content="WineApp" />
        <link rel="icon" href="/WineApp.ico" />
      </Head>

      <Header page="loja"/>
      <StyledHomeStore>
        <aside className="sidebar">
          <FilterSideBar setter={setFilter} />
        </aside>
        <StyledMain>
          {data.totalItems === 0
            ? (<p>Nenhum produto encontrado</p>)
            : (
              <ProdutosEncontrados>
                <p className="number">{
                  nameFilter !== '' 
                    ? data.items.filter((e: WineObj) => 
                      e.name.toLocaleLowerCase().includes(nameFilter)).length 
                    : data.totalItems
                }</p>
                <p>produtos encontrados</p>
              </ProdutosEncontrados>
            )}
          <StyledCards>
            {data.items.filter((e: WineObj) => 
              e.name.toLocaleLowerCase().includes(nameFilter))
              .map((e: WineObj) => (
                <WineCard wine={e} key={e.id} />
              ))}
          </StyledCards>

          {data.totalItems !== 0 && (
            <Pagination
              count={data.totalPages}
              color='secondary'
              page={page}
              onChange={(_e, p) => setPage(p)}
              shape='rounded'
              className='pagination'
              variant='outlined'
            />)}
        </StyledMain>
      </StyledHomeStore>
    </ThemeProvider>
  );
};

export default HomeStore;
