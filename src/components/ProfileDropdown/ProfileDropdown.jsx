import React from 'react'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";

const ProfileDropdown = ({ token02, profileData }) => {
  
  const navigate = useNavigate();
  const UserName = token02?.user?.name

  const LogOut = () => {
    toast.success("Log Out Successfully.")
    localStorage.clear("token")
    navigate("/")
  }

  return (
    <div className='custom-profile-dropdown'>
      <Menu isLazy>
        {/* <MenuButton>Open menu</MenuButton> */}
        <MenuButton className='UserName-style'>
          <img src={profileData?.image ? profileData?.image : "assets/image/profile/profile.png"} className="cursor-pointer proifle-image-dfd" alt="profile" />
          <p>{UserName}</p>
        </MenuButton>
        <MenuList>
          {/* MenuItems are not rendered unless Menu is open */}
          <MenuItem><Link to="/user-profile">Profile</Link></MenuItem>
          <MenuItem><Link to="/change-password">Change Password</Link></MenuItem>
          <MenuItem><Link to='/wallet'>Wallet</Link></MenuItem>
          {/* <MenuItem><Link to='/transaction'>All Transaction</Link></MenuItem>
          {
            token02.user.role !== "user" && (
              <MenuItem><Link to='/commission-transaction'>Commission Transaction</Link></MenuItem>
            )
          } */}

          <MenuItem><Link to='/wallet-transaction'>Wallet Transaction</Link></MenuItem>
          <MenuItem onClick={LogOut}><Link>Log-out</Link></MenuItem>
        </MenuList>
      </Menu>
    </div>
  )
}

export default ProfileDropdown
