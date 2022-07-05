
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Input } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, CalendarOutlined } from '@ant-design/icons';
import { NavLink, Redirect } from 'react-router-dom'
import { history } from '../../../App';
import { layDanhSachNDAction, xoaNDAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import styled from 'styled-components';



const { Search } = Input;

export default function Dashboard(props) {
  const { userLogin } = useSelector(state => state.LogReducer)
  const { mangND } = useSelector(state => state.QuanLyNguoiDungReducer);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(layDanhSachNDAction());
  }, [])

  // if (userLogin.maLoaiNguoiDung === 'KhachHang' && userLogin.maNhom !== 'GP03' || !(userLogin.maLoaiNguoiDung)) {
  //     alert("Bạn không có quyền truy cập vào trang admin! Hãy đăng nhập băng tài khoản Admin thuộc nhóm GP03")
  //     history.push('/')
  // }
  
  if(!localStorage.getItem("LOGIN_USER")){
    alert('Bạn không có quyền  truy cập vào trang này!')
    return <Redirect to='/'/>
  };
  
  if(userLogin.maLoaiNguoiDung !== 'QuanTri'){
    alert('Bạn không có quyền truy cập vào trang này!')
    return <Redirect to='/'/>
  }
  



  const columns = [
    {
      title: 'Tài Khoản',
      dataIndex: 'taiKhoan',
      sorter: (a, b) => {
        let taiKhoanA = a.taiKhoan.toLowerCase().trim();
        let taiKhoanB = b.taiKhoan.toLowerCase().trim();
        if (taiKhoanA > taiKhoanB) {
          return 1;
        }
        return -1
      },
      width: "15%"
    }, 
    {
      title: 'Họ Tên',
      dataIndex: 'hoTen',
      sorter: (a, b) => {
        let hoTenA = a.hoTen.toLowerCase().trim();
        let hoTenB = b.hoTen.toLowerCase().trim();
        if (hoTenA > hoTenB) {
          return 1;
        }
        return -1
      },
      width: "15%"
    },
    
    {
      title: 'Email',
      dataIndex: 'email',
      width: "15%"
    },
    {
      title: 'Số Điện Thoại',
      dataIndex: 'soDt',
      width: "15%"
    },
    {
      title: 'Mật Khẩu',
      dataIndex: 'matKhau',
      width: "15%"
    },
    {
      title: 'Loại Người Dùng',
      dataIndex: 'maLoaiNguoiDung',
      width: "10%",
      sorter: (a, b) => {
        let loaiA = a.maLoaiNguoiDung
        let loaiB = b.maLoaiNguoiDung
        if (loaiA > loaiB) {
          return 1;
        }
        return -1
      },
    },

    {
      title: 'Hành Động',
      dataIndex: 'maPhim',

      render: (text, ND) => {
        return (
          <Fragment key={`${mangND.taiKhoan}`} >
            <NavLink style={{ fontSize: 20 }} to={`/admin/edituser/${ND.taiKhoan}`} >
              <EditOutlined />
            </NavLink>
            <DeleteOutlined  className='text-danger ml-3' style={{ fontSize: 20, }} onClick={() => {
              if (window.confirm('Bạn có chắc muốn xoá người dùng' + ND.taiKhoan)) {
                dispatch(xoaNDAction(ND.taiKhoan))
              }
            }}/>
          </Fragment>)
      },
      width: "15%"
    },

  ];

  const data = mangND

  const onSearch = (value) => {
    dispatch(layDanhSachNDAction(value))
  };

  return (
    <div>
      <h2>Quản Lý Người Dùng</h2>
      <button className='my-3 btn btn-primary'  onClick={() => {
        history.push('/admin/adduser')
      }} >Thêm Người Dùng</button>
      <SearchStyled
        className='mb-4'
        placeholder="Search name..."
        size="large"
        enterButton={<SearchOutlined />} 
        onSearch={onSearch}
      />
      <Table key={`${data.taiKhoan}`} columns={columns} dataSource={data}  rowKey={"taiKhoan"} />
    </div>
  )
}
// ant-input-group-addon
const SearchStyled = styled(Search)`
    .ant-input-group-addon{
    background-color: #007bff;
    }
`