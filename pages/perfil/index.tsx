import { NextPage } from 'next';
import CommingSoon from '../../components/CommingSoon';
import Header from '../../components/Header';

const ProfileHome: NextPage = () => {
  return (
    <div>
      <Header />
      <CommingSoon />
    </div>
  );
};

export default ProfileHome;