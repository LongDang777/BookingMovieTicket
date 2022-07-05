import React, { useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutAction } from '../../action/LogoutAction';
import { history } from '../../App';

export default function LogOut() {
    const dispatch = useDispatch()
    const { userLogin } = useSelector(state => state.LogReducer)

    const handleLogout = () => {

        dispatch(LogoutAction())
        history.push('/')
    }

    return (
        <LogOutStyled className="dropdown">
            <button className="user-login fs-16 btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">
                <UserOutlined />
                <p className='user-name m-l-5'>{userLogin.taiKhoan}</p>
            </button>
            <div className="dropdown-menu">
                <button className="dropdown-item"
                    onClick={handleLogout}>Log out</button>
            </div>
        </LogOutStyled>
    )
}

const LogOutStyled = styled.div`

.user-login {
    color: #000;
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 5px;
    padding: 6px 15px;
    min-width: 100px;

    &::after {
      display: none;
    }
  }

  .dropdown-menu {
    border-radius: 5px;
    min-width: 100%;
    padding: 0;

    .dropdown-item {
      padding: 6px 15px;
      text-align: center;

      &:hover {
        border-radius: 5px;
      }

      &:active {
        background: #fff;
        color: #000;
      }
    }
  }
`

