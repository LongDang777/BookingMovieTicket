import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from 'react-redux';
import MultipleRows from "./ReactSlick/MultipleRowSlick";
import { layDanhSachReducer } from "../redux/actions/QuanLyPhimAction";

export default function FilmDetail() {
  const [data, setData] = useState([]);
  

  const {arrPhim} = useSelector( state => state.QuanLyPhimReducer)

  const dispatch = useDispatch()
  
  useEffect(() => {
    const action = layDanhSachReducer()
    dispatch(action)
  }, [])


  return (
    <div className="filmDetail">

        <MultipleRows arrPhim={arrPhim}/>
      <div className="filmDetail__container">
       
      </div>
    </div>
  );
}
