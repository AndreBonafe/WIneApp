import { NextPage } from 'next';
import Head from 'next/head';
import CommingSoon from '../../components/CommingSoon';
import Header from '../../components/Header';

const CartHome: NextPage = () => {
  return (
    <div>
      <Head>
        <title>WineApp - Carrinho</title>
        <meta name="description" content="WineApp" />
        <link rel="icon" href="/WineApp.ico" />
      </Head>
      <Header page="carrinho"/>
      <CommingSoon />
    </div>
  );
};

export default CartHome;