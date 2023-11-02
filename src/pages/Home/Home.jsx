import React, { useEffect } from 'react';
import HomeContent from '../Home/Content/HomeContent';
import Header from '../../components/Common/Header/Header';
import Footer from '../../components/Common/Footer/Footer';

const Home = () => {

  // page title
  useEffect(() => {
    document.title = 'E-Bhuktan';
  }, []);


  return (
    <div>
      <Header />
      <HomeContent />
      <Footer />
    </div>
  )
}

export default Home