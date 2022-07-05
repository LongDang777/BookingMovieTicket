import React from 'react';
import styled from 'styled-components';
import "../../assets/style/reset.scss";
import { Button, Col, Row } from 'antd';
import {
  FacebookFilled,
  TwitterOutlined,
  InstagramOutlined,
} from '@ant-design/icons';

export default function Footer() {
  return (
    <FooterStyled>
      <Row className="align-center">
        <Col lg={8}>
          <div className="footer-left d-flex">
            <p className='footer-left-item'><a className='footer-link' href="#">About</a></p>
            <p className='footer-left-item'><a className='footer-link' href="#">Terms of Service</a></p>
            <p className='footer-left-item'><a className='footer-link' href="#">Contact</a></p>
          </div>
        </Col>
        <Col lg={8}>
          <h1 className='text-uppercase fs-32 fw-700 text-center'>movieCyber</h1>
        </Col>
        <Col lg={8}>
          <div className="social justify-end">
            <a href="#">
              <FacebookFilled />
            </a>
            <a href="#">
              <TwitterOutlined />
            </a>
            <a href="#">
              <InstagramOutlined />
            </a>
          </div>
        </Col>
      </Row>
      <div className="copy-right m-t-20 justify-center fs-16">
        Copyright 2017 <p className='fw-700'>&nbsp;MOVIECYBER</p>. All Rights Reserved.
      </div>
    </FooterStyled>
  )
}

const FooterStyled = styled.div`
  background: #fff;
  padding: 40px 0;
  border-top: 1px solid #d8d8d870;
  width: 90%;
  margin: 0 auto;

  .footer-left {
    gap: 10px;
    
    .footer-link {
      color: #aca8aa;
      font-size: 16px;
    }
  }

  h1 {
    color: #09afe4;
  }

  .social {
    gap: 10px; 

    .anticon {
      color: #aca8aa;
      font-size: 24px
    }
  }

  .copy-right {
    color: #aca8aa;
  }
`