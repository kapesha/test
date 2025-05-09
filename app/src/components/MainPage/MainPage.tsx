import React, { useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { Good } from "../Good/Good";
import axios from 'axios'
import classNames from 'classnames';
import { Modal } from '../Modal/Modal';
import { AddForm } from '../AddForm/AddForm';
import { setAll } from "../../store/reducers/products"
import { RootState } from "../../store/index"

export const MainPage = () => {
  const dispatch = useDispatch();
  const [showSort, setShowSort] = useState<boolean>(false);
  const [addItems, setAddItems] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'alphabet' | 'count'>('alphabet')
  const ref = useRef<HTMLUListElement>(null);
  const goods = useSelector((state: RootState) => state.products);
  const list = useMemo(() => {
    if (sortBy === 'alphabet') {
      return [...goods.data].sort((a, b) => `${a.name}`.localeCompare(b.name)) 
      return goods.data
    }
    return [...goods.data].sort((a, b) => a.count - b.count)
  }, [goods, sortBy])

  useEffect(() => {
    axios.get("http://localhost:3001/products")
      .then(response => {
        dispatch(setAll(response.data))
        console.log(goods);
      })
      .catch(error => console.log(error))
  }, [])


  return (
    <div className='main'>
      <h1 className='main__h1'>Товари</h1>
      <div className='main__navigation'>
        <div className='main__sortings'>
          <p onClick={() => setShowSort(!showSort)}>сортування</p>
          <ul ref={ref} className={classNames('main__sortings-list', {
            isActive: showSort,
          })}
          >
            <li onClick={() => setSortBy("alphabet")} className='main__sortings-item'>
              за алфавітом
            </li>
            <li onClick={() => setSortBy('count')} className='main__sortings-item'>
              за кількістю
            </li>
          </ul>

        </div>
        <button className='main__add-button' onClick={() => setAddItems(true)}>
          додати
        </button>
      </div>
      <div className='list'>
        {list ? list.map((good, index) => (
          <Good key={good.id} good={good} index={index} />
        )) : (
          <p>Поки що товарів немає</p>
        )}
      </div>
      <Modal openModal={addItems} setOpenModal={setAddItems}>
        <AddForm setOpenModal={setAddItems} />
      </Modal>
    </div>

  )
}