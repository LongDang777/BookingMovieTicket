import { Button, Modal, Select } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import "../../assets/style/reset.scss";
import { useSelector, useDispatch } from 'react-redux';
import Register from '../form/Register';
import Login from '../form/Login';
import LogOut from '../logout/LogOut';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

export default function Header() {
  const { t, i18n } = useTranslation()

  const handleChange = (value) => {
    i18n.changeLanguage(value)
  }

  const dispatch = useDispatch()
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
    setTitle("Login");
    dispatch({
      type: 'OPEN_MODAL',
      Component: <Login />,
      isVisible: true,
    })
  };

  const showRegister = () => {
    setTitle("Register");
    dispatch({
      type: 'OPEN_MODAL',
      Component: <Register />,
      isVisible: true,
    })
  };

  return (
    <HeaderStyled>
      <div className="header d-flex">
        <NavLink to="/" className="brand fw-700">movieCyber</NavLink>
        <div className="sign-in-up d-flex">
          {!!userLogin.taiKhoan ?
            <LogOut />
            :
            <>
              <Button onClick={showLogin}>
                {t("Log in")}
              </Button>
              <Button onClick={showRegister}>
                {t("Register")}
              </Button>
            </>
          }
          <Select defaultValue="en" style={{ width: 80 }} onChange={handleChange} className='d-flex align-items-center'>
            <Option value="en">Eng</Option>
            <Option value="chi">China</Option>
            <Option value="vi">Vie</Option>
          </Select>

        </div>
      </div>
      <Modal
        title={title}
        visible={isVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {Component}
      </Modal>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);

  .header {
    width: 90%;
    margin: 25px 5%;
    justify-content: space-between;
    align-items: center;

    .brand {
      text-transform: uppercase;
      font-size: 32px;
      color: #fff;
      margin: 0;
    }
  }

  .sign-in-up {
    gap: 10px;

    .ant-btn {
      font-size: 16px;
      background-color: #fff;
    }
  }

`
