import React, { useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { add } from '../../store/reducers/products';


export const AddForm = ({setOpenModal}) => {
  const [name, setName] = useState<string>('')
  const [imageUrl, setImageUrl] = useState<string>('')
  const [count, setCount] = useState<number>(0)
  const [weight, setWeight] = useState<string>('')
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const dispatch = useDispatch();
  const [error, setError] = useState<boolean>(false)

  const addGood = (name, imageUrl, count, weight, width, height) => {
    if (name && imageUrl && count !== 0 && weight && width !== 0 && height !== 0) {
      setError(false)
      axios.post("http://localhost:3001/products", {
        id: Math.round(Math.random() * 1000000).toString(),
        name,
        imageUrl,
        count,
        weight,
        size: {
          width,
          height,
        },
        comments: [],
      })
        .then((response) => {
          dispatch(add(response.data))
          setOpenModal(false)
        })
    } else {
      setError(true)
    }
  }

  return (
    <div className='add-form'>
      <input
        type="text"
        placeholder='назва'
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder='кількість'
        value={count}
        onChange={(e) => setCount(+e.target.value)}
      />
      <input
        type="text"
        placeholder='посилання на фото'
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder='вага'
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <input
        type="number"
        placeholder='ширина'
        value={width}
        onChange={(e) => setWidth(+e.target.value)}
      />
      <input
        type="number"
        placeholder='висота'
        value={height}
        onChange={(e) => setHeight(+e.target.value)}
      />
      <button onClick={() => addGood(name, imageUrl, count, weight, width, height)} className='add-form__button'>додати</button>
      {error && (
        <p>Заповність всі інпути, будь ласка</p>
      )}
    </div>
  )
}