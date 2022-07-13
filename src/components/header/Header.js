import { Button, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import "../../assets/style/reset.scss";
import { useSelector, useDispatch } from 'react-redux';
import Register from '../form/Register';
import Login from '../form/Login';
import LogOut from '../logout/LogOut';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './header.css'
import Search from './Search';
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction';


const { Option } = Select;

export default function Header() {
  const { t, i18n } = useTranslation()

  const handleChange = (value) => {
    i18n.changeLanguage(value)
  }

  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(layDanhSachPhimAction())
  }, [])
  const { mangPhim } = useSelector(state => state.QuanLyPhimReducer)
  const mangTenPhim = [];
  const taoMangTenPhim =()=>{
    for(const phim of mangPhim)
     mangTenPhim.push(phim.tenPhim)
  }
  taoMangTenPhim();

  localStorage.setItem('mangTenPhim',JSON.stringify(mangTenPhim))

  const { Component, isVisible } = useSelector(state => state.ModalReducer)
  const { userLogin } = useSelector(state => state.LogReducer)
  const [title, setTitle] = useState("");



  const handleCancel = () => {
    dispatch({
      type: 'CLOSE_MODAL',
      isVisible: false,
    })
  };

  const showLogin = () => {
    setTitle("Đăng Nhập");
    dispatch({
      type: 'OPEN_MODAL',
      Component: <Login />,
      isVisible: true,
    })
  };

  const showRegister = () => {
    setTitle("Đăng Kí");
    dispatch({
      type: 'OPEN_MODAL',
      Component: <Register />,
      isVisible: true,
    })
  };

  //scroll up/down
  const body = document.body;
  // const nav = document.querySelector(".header");
  const scrollUp = "scroll-up";
  const scrollDown = "scroll-down";
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      body.classList.remove(scrollUp);
      return;
    }

    if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
      // down
      body.classList.remove(scrollUp);
      body.classList.add(scrollDown);
    } else if (
      currentScroll < lastScroll &&
      body.classList.contains(scrollDown)
    ) {
      // up
      body.classList.remove(scrollDown);
      body.classList.add(scrollUp);
    }
    lastScroll = currentScroll;
  });

  return (
    <div className='header'>
      <nav className="container header__content d-flex justify-content-between navbar navbar-expand-lg ">
        <NavLink to="/" className="brand fw-700">MovieCyber</NavLink>
        <Search/>
        <div className="sign-in-up d-flex">
          {!!userLogin.taiKhoan ?
            <LogOut />
            :
            <>
              <Button onClick={showLogin}>
                {t("Đăng Nhập")}
              </Button>
              <Button onClick={showRegister}>
                {t("Đăng Kí")}
              </Button>
            </>
          }
          <Select defaultValue="en" style={{ width: 80 }} onChange={handleChange} className='d-flex align-items-center'>
            <Option value="en">Eng</Option>
            <Option value="chi">China</Option>
            <Option value="vi">Vie</Option>
          </Select>

        </div>
      </nav>
      <Modal
        title={title}
        visible={isVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {Component}
      </Modal>



    </div>
  )
}

