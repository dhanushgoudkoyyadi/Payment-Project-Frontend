import React from 'react';
import Angular from './Angular';
import Backend from './Backend';
import Devops from './Devops';
import Java from './Java';
import Mean from './Mean';
import Mern from './Mern';
import Python from './Python';
import Reactc from './Reactc';
import './Tech.css';
function Tech() {
  return (
    <div className='tech-container'>
      <Angular></Angular>
      <Backend></Backend>
      <Devops></Devops>
      <Java></Java>
      <Mean></Mean>
      <Mern></Mern>
      <Python></Python>
      <Reactc></Reactc>
    </div>
  )
}

export default Tech
