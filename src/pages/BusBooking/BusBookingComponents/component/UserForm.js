import React, { useState } from 'react'

const UserForm = ({ onSave, label, isShow, value }) => {
  const [pessengerAddObj, setPessengerAddObj] = useState(
    {
      FirstName: value?.userData?.FirstName,
      LastName: value?.userData?.LastName,
      Phoneno: value?.userData?.Phoneno,
      Email: value?.userData?.Email,
      Age: value?.userData?.Age,
      Gender: value?.userData?.Gender,
      Address: value?.userData?.Address,
      IdNumber: value?.userData?.IdNumber,
      IdType: value?.userData?.IdType,
    }
  )

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
              name='Phoneno'
              value={pessengerAddObj.Phoneno}
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
            <label htmlFor="Address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
            <input type="text"
              onChange={handlerInputPesserger}
              id="Address"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Address Line 1"
              name='Address'
              value={pessengerAddObj.Address}
              required
            />
          </div>
          <div className='w-50'>
            <label htmlFor="Age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Of Birth</label>
            <input type="date"
              onChange={handlerInputPesserger}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name='Age'
              value={pessengerAddObj.Age}
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
            <label htmlFor="IdType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Id Type </label>
            <select
              name="IdType"
              value={pessengerAddObj.IdType}
              style={{ minHeight: '41px' }}
              id="IdType"
              onChange={handlerInputPesserger}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="select">select</option>
              <option value="Pan no">Pan no</option>
              <option value="Voterid card">Voterid card</option>
              <option value="Passport">Passport</option>
            </select>
          </div>
        </div>
        {pessengerAddObj.IdType ? <div className="formGroup">
          <div className='w-50'>
            <label htmlFor="IdNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter {pessengerAddObj?.IdType} no.</label>
            <input type="text"
              onChange={handlerInputPesserger}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Address Line 2"
              name='IdNumber'
              value={pessengerAddObj.IdNumber}
              required
            />
          </div>
        </div> : null}
        <button type="submit" className="w-40 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 button-color"
        >Save</button>
      </form>
    </div>
  )
}

export default UserForm
