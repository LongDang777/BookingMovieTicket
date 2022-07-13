import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction';
import './search.css'

export default function Search(props) {


  const dispatch = useDispatch()
  const [value, setValue] = useState('')

  const handleOnChange = (e) => {
    let { value } = e.target
    setValue({
      value: value.toLowerCase()
    })
    dispatch(layDanhSachPhimAction(value))
  }

  const { mangPhim } = useSelector(state => state.QuanLyPhimReducer)
  const renderContenSearch = () => {
    return mangPhim.map((item, index) => {
      return (
        <div className='d-flex flex-column my-1' key={index}>
          <NavLink to={`/detail/${item.maPhim}`} >
            {item.tenPhim}
          </NavLink>
        </div>
      )
    })
  }

  return (
    <div className='searchFilm'>
    {/* <input
      className='form-control round'
      onKeyUp={handleOnChange}
      placeholder='Type to search...'>
    </input>
    <div className='pt-2 search__content'> {value !== '' ? renderContenSearch(): ''}</div> */}
    <form className="search-form">
      <input type="search" name={value} placeholder="Từ khoá tìm kiếm..." className="search-input" />
      <button type="submit" className="search-button">
        <svg className="submit-button">
          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#search" />
        </svg>
      </button>
    </form>


    <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" display="none">
      <symbol id="search" viewBox="0 0 32 32">
        <path d="M 19.5 3 C 14.26514 3 10 7.2651394 10 12.5 C 10 14.749977 10.810825 16.807458 12.125 18.4375 L 3.28125 27.28125 L 4.71875 28.71875 L 13.5625 19.875 C 15.192542 21.189175 17.250023 22 19.5 22 C 24.73486 22 29 17.73486 29 12.5 C 29 7.2651394 24.73486 3 19.5 3 z M 19.5 5 C 23.65398 5 27 8.3460198 27 12.5 C 27 16.65398 23.65398 20 19.5 20 C 15.34602 20 12 16.65398 12 12.5 C 12 8.3460198 15.34602 5 19.5 5 z" />
      </symbol>
    </svg>
  </div>
  )
}
