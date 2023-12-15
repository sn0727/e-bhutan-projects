import React, { useState } from 'react'

const UserForm = ({ onSave, label, isShow, value  }) => {
  // const value = {}
  const [pessengerAddObj, setPessengerAddObj] = useState({
    FirstName: value?.userData?.FirstName,
    LastName: value?.userData?.LastName,
    ContactNo: value?.userData?.ContactNo,
    Email: value?.userData?.Email,
    City: value?.userData?.City,
    DateOfBirth: value?.userData?.DateOfBirth,
    Gender: value?.userData?.Gender,
    PassportNo: value?.userData?.PassportNo,
    PassportExpiry: value?.userData?.PassportExpiry,
    AddressLine1: value?.userData?.AddressLine1,
    AddressLine2: value?.userData?.AddressLine2
  })

  const handlerInputPesserger = (event) => {
    setPessengerAddObj({ ...pessengerAddObj, [event.target.name]: event.target.value })
  }

  const savePessenger = () => {
    onSave(pessengerAddObj, label);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(event, 'submitHandler');
    savePessenger()
  }



  return (
    <div className={`p-6 space-y-4 md:space-y-6 sm:p-8 ${isShow ? '' : 'd-none'} `}>
      <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
        <div className="formGroup">
          <div className='w-50 position-relative'>
            <label htmlFor="FirstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
            <input type="text"
              onChange={handlerInputPesserger}
              placeholder='Fist Name'
              name='FirstName'
              value={pessengerAddObj.FirstName}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className='w-50'>
            <label htmlFor="LastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
            <input type="text"
              onChange={handlerInputPesserger}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Last Name"
              name='LastName'
              value={pessengerAddObj.LastName}
              required />
          </div>
        </div>
        <div className="formGroup">
          <div className='w-50 position-relative'>
            <label htmlFor="profile-update" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact No</label>
            <input type="text"
              onChange={handlerInputPesserger}
              placeholder='Contact No'
              name='ContactNo'
              value={pessengerAddObj.ContactNo}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className='w-50'>
            <label htmlFor="Email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Id</label>
            <input type="text"
              onChange={handlerInputPesserger}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email Id"
              name='Email'
              value={pessengerAddObj.Email}
              required />
          </div>
        </div>
        <div className="formGroup">
          <div className='w-50'>
            <label htmlFor="City" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
            <input type="text"
              onChange={handlerInputPesserger}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="City"
              name='City'
              value={pessengerAddObj.City}
              required
            />
          </div>
          <div className='w-50'>
            <label htmlFor="DateOfBirth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Of Birth</label>
            <input type="date"
              onChange={handlerInputPesserger}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name='DateOfBirth'
              value={pessengerAddObj.DateOfBirth}
              required
            />
          </div>
        </div>
        <div className="formGroup">
          <div className='w-50'>
            <label htmlFor="Gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Gender</label>
            <select
              name="Gender"
              value={pessengerAddObj.Gender}
              style={{ minHeight: '41px' }}
              id="Gender"
              onChange={handlerInputPesserger}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="select">select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className='w-50'>
            <label htmlFor="PassportNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Passport No</label>
            <input type="text"
              onChange={handlerInputPesserger}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Passport No"
              name='PassportNo'
              value={pessengerAddObj.PassportNo}
              required />
          </div>
        </div>
        <div className="formGroup">
          <div className='w-50'>
            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Passport Expiry Date</label>
            <input type="date"
              onChange={handlerInputPesserger}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Passport Expiry Date"
              name='PassportExpiry'
              value={pessengerAddObj.PassportExpiry}
              required />
          </div>
          <div className='w-50'>
            <label htmlFor="AddressLine1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address Line 1</label>
            <input type="text"
              onChange={handlerInputPesserger}
              id="AddressLine1"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Address Line 1"
              name='AddressLine1'
              value={pessengerAddObj.AddressLine1}
              required
            />
          </div>
        </div>
        <div className="formGroup">
          <div className='w-50'>
            <label htmlFor="AddressLine2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address Line 2</label>
            <input type="text"
              onChange={handlerInputPesserger}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Address Line 2"
              name='AddressLine2'
              value={pessengerAddObj.AddressLine2}
              required
            />
          </div>
        </div>
        <button type="submit" className="w-40 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 button-color"
        >Save</button>
      </form>
    </div>
  )
}

export default UserForm
