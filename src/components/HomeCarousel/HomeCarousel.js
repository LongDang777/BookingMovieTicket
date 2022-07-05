import React, { useEffect } from 'react';
import "../../assets/style/reset.scss";
import { useSelector, useDispatch } from 'react-redux';
// import { Carousel } from 'antd';
import { LayDanhSachBanner } from '../../action/CarouselAction';


import Carousel from 'better-react-carousel'

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
        return(
            <div className='m-t-100'>
        <Carousel  scroll-snap={true} mobileBreakpoint={375} showDots={true} autoplay={2000} cols={1} rows={1} gap={10} loop>
            {arrBanner.map((item, index) => {
                return <Carousel.Item key={index}>
                   <img width="100%" src={item.hinhAnh} />
                </Carousel.Item>
            })}
        </Carousel>
            </div>
        )

    }

    return (
        <>
            {RenderCarousel()}
        </>
    )
}

