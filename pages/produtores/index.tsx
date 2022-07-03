import { NextPage } from 'next';
import Head from 'next/head';
import CommingSoon from '../../components/CommingSoon';
import Header from '../../components/Header';

const ProdHome: NextPage = () => {
  return (
    <div>
      <Head>
        <title>WineApp - Produtores</title>
        <meta name="description" content="WineApp" />
        <link rel="icon" href="/WineApp.ico" />
      </Head>
      <Header />
      <CommingSoon />
    </div>
  );
};

export default ProdHome;