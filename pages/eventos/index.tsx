import { NextPage } from 'next';
import Head from 'next/head';
import CommingSoon from '../../components/CommingSoon';
import Header from '../../components/Header';

const EventHome: NextPage = () => {
  return (
    <div>
      <Head>
        <title>WineApp - Eventos</title>
        <meta name="description" content="WineApp" />
        <link rel="icon" href="/WineApp.ico" />
      </Head>
      <Header page="eventos"/>
      <CommingSoon />
    </div>
  );
};

export default EventHome;