import { NextPage } from 'next';
import Head from 'next/head';
import CommingSoon from '../../components/CommingSoon';
import Header from '../../components/Header';

const ClubHome: NextPage = () => {
  return (
    <div>
      <Head>
        <title>WineApp - Clube</title>
        <meta name="description" content="WineApp" />
        <link rel="icon" href="/WineApp.ico" />
      </Head>
      <Header />
      <CommingSoon />
    </div>
  );
};

export default ClubHome;