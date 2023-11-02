import React from 'react'
import ProfileContent from './content/ProfileContent';
import Header from '../../components/Common/Header/Header';
import Footer from '../../components/Common/Footer/Footer';
const Profile = () => {
  return (
    <React.Fragment>
      <Header />
      <ProfileContent />
      <Footer />
    </React.Fragment>
  )
}

export default Profile
