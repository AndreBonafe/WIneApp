import { NextPage } from 'next';
import Image from 'next/image';
import CommingSoon from '../components/CommingSoon';
import Header from '../components/Header';

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <h1>Bem-Vindo ao Wine APP!</h1>
      <Image
        src="/wine.svg"
        alt="Wine-logo"
        height={250}
        width={250}
      />
      <h2>Desenvolvido por: André Bonafé Bastos</h2>
      <CommingSoon />
    </div>
  );
};

export default Home;