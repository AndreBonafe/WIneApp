import { NextPage } from 'next';
import Head from 'next/head';
import CommingSoon from '../../components/CommingSoon';
import Header from '../../components/Header';

const ProfileHome: NextPage = () => {
  return (
    <div>
      <Head>
        <title>WineApp - Perfil</title>
        <meta name="description" content="WineApp" />
        <link rel="icon" href="/WineApp.ico" />
      </Head>
      <Header page="perfil"/>
      <CommingSoon />
    </div>
  );
};

export default ProfileHome;