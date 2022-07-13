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
      <form className='form-inline d-lg-flex'>
        <div className='input-group'>
          <input type="search" name={value} class="form-control form-control-prepended " data-toggle="dropdown" placeholder="Từ khóa tìm kiếm..." aria-label="Search"  aria-expanded="true"></input>
        </div>
        <div class="input-group-prepend">
          <div class="input-group-text">
            <i class="bx bx-search"></i>
          </div>
        </div>

      </form>
    </div>
  )
}
