import React from 'react';
import classNames from 'classnames';

export const Modal = ({children, openModal, setOpenModal }) => {
  return (
    <div className={classNames('modal', {
      isActive: openModal,
    })}>
      <div className='modal__content'>
      {children}

      </div>
      <div className='modal__background' onClick={() => setOpenModal(false)} />
    </div>
  )
}