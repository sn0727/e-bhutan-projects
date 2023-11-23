import styled from '@emotion/styled';
import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

const BackButton = ({ link }) => {

  return (
    <div className='go-to-back'>
      <Link className='' to={`/${link}`}><IoMdArrowRoundBack /></Link>
    </div>
  )
}

export default BackButton;
