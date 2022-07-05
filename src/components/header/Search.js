import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { history } from '../../App';
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction';


export default function Search(props) {

  
  const dispatch = useDispatch()
  const [value,setValue] = useState('')
  
  const handleOnChange=(e)=>{
    let {value} = e.target
    setValue({
      value: value.toLowerCase()
    })
    dispatch(layDanhSachPhimAction(value))
  }
  
  const { mangPhim } = useSelector(state => state.QuanLyPhimReducer)
  const renderContenSearch=()=>{
    return mangPhim.map((item,index)=>{
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
    <div className='col col-lg-4'>
      <input
        className='form-control round'
        onKeyUp={handleOnChange}
        placeholder='Type to search...'>
      </input>
      <div> {value ? renderContenSearch(): ''}</div>
    </div>
  )
}
