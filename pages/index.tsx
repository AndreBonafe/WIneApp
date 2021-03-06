import { NextPage } from 'next';
import Image from 'next/image';
import Header from '../components/Header';
import styled from 'styled-components';
import Head from 'next/head';

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-top: 25px;
`;

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>WineApp</title>
        <meta name="description" content="WineApp" />
        <link rel="icon" href="/WineApp.ico" />
      </Head>

      <Header page="home"/>
      <StyledHome>
        <h1>Bem-Vindo(a) ao Wine APP!</h1>
        <Image
          src="/wine.svg"
          alt="Wine-logo"
          height={350}
          width={350}
        />
        <h2>Desenvolvido por: André Bonafé Bastos</h2>
      </StyledHome>
    </>
  );
};

export default Home;