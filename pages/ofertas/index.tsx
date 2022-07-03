import { NextPage } from 'next';
import Head from 'next/head';
import CommingSoon from '../../components/CommingSoon';
import Header from '../../components/Header';

const OfferHome: NextPage = () => {
  return (
    <div>
      <Head>
        <title>WineApp - Ofertas</title>
        <meta name="description" content="WineApp" />
        <link rel="icon" href="/WineApp.ico" />
      </Head>
      <Header page="ofertas"/>
      <CommingSoon />
    </div>
  );
};

export default OfferHome;