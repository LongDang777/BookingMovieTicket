import { Button } from 'antd';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import "../../assets/style/reset.scss";
import { useSelector, useDispatch } from 'react-redux';
import { Carousel } from 'antd';
import { LayDanhSachBanner } from '../../action/CarouselAction';
import './HomeCarousel.css'


export const HomeCarousel = () => {
    const dispatch = useDispatch();
    const { arrBanner } = useSelector(state => state.CarouselReducer)

    const callAPIBanner = () => {
        const actionFunction = LayDanhSachBanner();
        dispatch(actionFunction);
    }

    useEffect(() => {
        callAPIBanner();
    }, [])

    const RenderCarousel = () => {
        return arrBanner.map((item, index) => {
            return <div key={index}>
                <div className='carousel__content' style={{ backgroundImage: `url(${item.hinhAnh})` }}></div>
            </div>
        })
    }

    return (
        <div className='container carousel'>
            <Carousel effect="fade">
                {RenderCarousel()}
            </Carousel>
        </div>
    )
}

