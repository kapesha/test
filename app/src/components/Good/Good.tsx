import React from 'react';
import axios from 'axios';
import { Product } from '../../types/good';
import { remove } from "../../store/reducers/products"
import { useDispatch, useSelector } from 'react-redux'

type Props = {
  good: Product;
  index: number;
}


export const Good: React.FC<Props> = ({ good, index }) => {
  const dispatch = useDispatch();
  function deleteGood(goodId: string) {
    axios.delete(`http://localhost:3001/products/${goodId}`)
      .then(() => {
        dispatch(remove(goodId))
      })
  }

  return (
    <div className="good">
      <div className="good__info">
        <p className="good__index">{index + 1}.</p>
        <img className="good__img" src={good.imageUrl} alt="#" />
        <p className="good__name">{good.name}</p>
        <p>{good.count}</p>
      </div>
      <button onClick={() => deleteGood(good.id)} className="good__button">прибрати</button>
    </div>
  )
}