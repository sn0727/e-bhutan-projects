import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ApiUrl } from '../../../utils/api';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

const ProfileContent = () => {
  // get user data from token 
  const token = sessionStorage.getItem("token")
  const decodeToken = jwtDecode(token);
  const result = decodeToken.user;

  console.log(result, "res chekcer")

  const [profileData, seProfileData] = useState([])
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [aadharNo, setAadharNo] = useState('');
  const [panNo, setPanNo] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [statep, setStateP] = useState('');
  const [district1, setDistrict] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState('');

  console.log(profileData.postalCode, "profileData.postalCode")

  const Registration = async () => {
    const formdata = new FormData();
    formdata.append('userId', profileData.id)
    formdata.append('name', name)
    formdata.append('email', email)
    formdata.append('contact', contact)
    formdata.append('aadharNo', aadharNo)
    formdata.append('panNo', panNo)
    formdata.append('state', statep)
    formdata.append('district', district1)
    formdata.append('role', role)
    formdata.append('address', address)
    formdata.append('postalCode', postalCode ? postalCode : profileData.postalCode)
    if (password) {
      formdata.append('password', password)
    }
    formdata.append('image', file)

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: ApiUrl.update,
      headers: {
        'token': token,
      },
      data: formdata
    };

    axios.request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        const { error, message } = response?.data;
        if (!error) {
          toast.success(message)
          setTimeout(() => {
            window.location.reload(true);
          }, [1000])
        } else {
          toast.error(message)
        }
      })
      .catch((server_error) => {
        // console.log(error.response.data);
        const { error, message } = server_error?.response?.data;
        if (error) {
          toast.error(message)
        }
      });
  }

  const getProfile = async () => {
    let config = {
      method: 'get',
      url: ApiUrl.userGetByToken,
      headers: {
        'token': token
      }
    };

    axios.request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        seProfileData(response?.data?.user)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // remove profile image handler
  const RemoveProfileHandler = () => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: ApiUrl.removeProfile,
      headers: {
        'token': token
      }
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        const { error, message } = response?.data;
        if (!error) {
          toast.success(message)
          setTimeout(() => {
            window.location.reload(true);
          }, [1000])
        } else {
          toast.error(message)
        }
      })
      .catch((server_error) => {
        // console.log(error);
        const { error, message } = server_error?.response?.data;
        if (error) {
          toast.error(message)
        }
      });

  }

  const submitHandler = (event) => {
    event.preventDefault();
    Registration()
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto py-5 lg:py-0">
        <div className="setcostuasdnf max-w-7xl bg-white rounded-lg shadow dark:border md:mt-0 lg:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Profile Information - {profileData?.role}
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
              <div className="formGroup">
                <div className='w-50'>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Id</label>
                  <input type="text"
                    defaultValue={profileData.id}
                    disabled
                    onChange={(e) => setName(e.target.value)}
                    name="id" id="id" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Id" required />
                </div>
                <div className='w-50 position-relative'>
                  <label htmlFor="profile-update" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Update</label>
                  <input type="file"
                    defaultValue={''}
                    onChange={(event) => setFile(event.target.files[0])}
                    name="file" id="file" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  <div className='profile-image-button'>
                    <img src={profileData.image ? profileData.image : "assets/image/profile/profile.png"} className='profile-image-dfd' />
                    <div type='submit' className='btn btn-danger' onClick={RemoveProfileHandler}>Remove Profile</div>
                  </div>
                </div>
              </div>
              <div className="formGroup">
                <div className='w-50'>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                  <input type="text"
                    defaultValue={profileData.name}
                    onChange={(e) => setName(e.target.value)}
                    name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
                </div>
                <div className='w-50'>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email"
                    disabled
                    defaultValue={profileData.email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                </div>
              </div>
              <div className="formGroup">
                <div className='w-50'>
                  <label htmlFor="aadharNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Aadhar No</label>
                  <input type="text"
                    disabled
                    defaultValue={profileData.aadharNo}
                    onChange={(e) => setAadharNo(e.target.value)}
                    name="aadharNo" maxLength={12} id="aadharNo" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2222 2222 2222" required />
                </div>
                <div className='w-50'>
                  <label htmlFor="panNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Pan No</label>
                  <input type="text"
                    disabled
                    defaultValue={profileData.panNo}
                    onChange={(e) => setPanNo(e.target.value)}
                    name="panNo" id="panNo" maxLength={9} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ASDF1232R" required />
                </div>
              </div>
              <div className="formGroup">
                <div className='w-50'>
                  <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Address</label>
                  <input type="text"
                    defaultValue={profileData.address}
                    onChange={(e) => setAddress(e.target.value)}
                    name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address" required />
                </div>
                <div className='w-50'>
                  <label htmlFor="postalCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Postal Code</label>
                  <input type="text"
                    disabled
                    defaultValue={profileData.postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    name="postalCode" id="postalCode" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="110098" required />
                </div>
              </div>
              <div className="formGroup">
                <div className='w-50'>
                  <label htmlFor="statep" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your State</label>
                  <input type="text"
                    defaultValue={profileData.state === 'null' ? '' : profileData.state}
                    onChange={(e) => setStateP(e.target.value)}
                    name="statep" id="statep" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="state" required />
                </div>
                <div className='w-50'>
                  <label htmlFor="district" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your district</label>
                  <input type="text"
                    defaultValue={profileData.district === 'null' ? '' : profileData.district}
                    onChange={(e) => setDistrict(e.target.value)}
                    name="district" id="district" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="district" required />
                </div>
              </div>
              <div className="formGroup">
                <div className='w-50'>
                  <label htmlFor="contact" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Contact</label>
                  <input type="text"
                    disabled
                    defaultValue={profileData.contact}
                    onChange={(e) => setContact(e.target.value)}
                    name="contact" id="contact" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+91 0000 0000 00" required />
                </div>

              </div>
              <div className="formGroup">
                {/* <div className='w-50'>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                  <input type="password"
                    defaultValue={''}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div> */}
                {/* <div className='w-50'>
                  <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Role</label>
                  <input type="text"
                    defaultValue={profileData.role}
                    onChange={(e) => setRole(e.target.value)}
                    name="role" id="role" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="role" required />
                </div> */}
              </div>

              <button type="submit" className="w-40 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 button-color">Contiune</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileContent
