import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Input } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, CalendarOutlined } from '@ant-design/icons';
import { layDanhSachPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import { xoaPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import { NavLink } from 'react-router-dom'
import { history } from '../../../App';
import styled from 'styled-components';

const { Search } = Input;

export default function Films() {
  const { mangPhim } = useSelector(state => state.QuanLyPhimReducer);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(layDanhSachPhimAction());
  }, [])
  const columns = [
    {
      title: 'Mã Phim',
      dataIndex: 'maPhim',
      value: (text, object) => { return <span>{text}</span> },
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ['descend', 'ascend'],
      width: "10%"
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'hinhAnh',
      render: (text, films, index) => {
        return <Fragment >
          <img src={films.hinhAnh} alt={films.tenPhim} height={100} onError={(e) => (e.target.onerror = null, e.target.src = `http://picsum.photos/id/${index}/70/70`)} />
        </Fragment>
      },
      width: "10%"
    },
    {
      title: 'Tên Phim',
      dataIndex: 'tenPhim',
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1
      },
      width: "20%"
    },
    {
      title: 'Mô Tả',
      dataIndex: 'moTa',
      render: (text, film) => {
        return <Fragment>
          {film.moTa.length > 50 ? film.moTa.substr(0, 70) + '...' : film.moTa}
        </Fragment>
      },
      width: "35%"
    },
    {
      title: 'Hành Động',
      dataIndex: 'maPhim',

      render: (text, film) => {
        return (
          <Fragment >
            <NavLink key={1} style={{ fontSize: 20 }} to={`/admin/films/edit/${film.maPhim}`} >
              <EditOutlined />
            </NavLink>
            <DeleteOutlined  key={2} className='text-danger ml-3' style={{ fontSize: 20, }}            
            onClick={() => {
              if (window.confirm('Bạn có chắc muốn xoá phim' + film.tenPhim)) {
                dispatch(xoaPhimAction(film.maPhim))
              }
            }}/>
            <NavLink className='ml-3' key={3} style={{ fontSize: 20 }} to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`}  onClick={()=>{
              localStorage.setItem('filmParams',JSON.stringify(film))
            }}>
              <CalendarOutlined style={{ color: 'green' }} />
            </NavLink>
          </Fragment>)
      },
      width: "15%"
    },
  ];

  const data = mangPhim
  const onSearch = (value) => {
    dispatch(layDanhSachPhimAction(value))
  };
  function onChange(pagination, filters, sorter, extra) {
    // console.log('params', pagination, filters, sorter, extra);
  }
  return (
    <div>
      <h2>Quản Lý Phim</h2>
      <Button className='my-3' type="primary" style={{ background: "#40a9ff" }} onClick={() => {
        history.push('/admin/films/addnew')
      }} >Thêm Phim</Button>
      <SearchStyled
        className='mb-4'
        placeholder="Search..."
        size="large"
        enterButton={<SearchOutlined />}
        onSearch={onSearch}
      />
      <Table columns={columns} dataSource={data} onChange={onChange} rowKey={"maPhim"} />
    </div>
  )
}
const SearchStyled = styled(Search)`
    .ant-input-group-addon{
    background-color: #007bff;
    }
`