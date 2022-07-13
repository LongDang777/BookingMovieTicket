import React, { useEffect } from 'react';
import "../../assets/style/reset.scss";
import { useSelector, useDispatch } from 'react-redux';
import { LayDanhSachBanner } from '../../action/CarouselAction';
import Carousel from 'better-react-carousel'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';



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


    return (
        <div className='m-t-100'>
            <Carousel scroll-snap={true} mobileBreakpoint={375} showDots={true} autoplay={10000} cols={1} rows={1} gap={10} loop>
                {arrBanner.map((item, index) => {
                    return <Carousel.Item key={index}>
                        <img width="100%" src={item.hinhAnh} />
                    </Carousel.Item>
                })}
            </Carousel>
            {/* <Swiper
                spaceBetween={50}
                slidesPerView={3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {arrBanner.map((item, index) => {
                    return <SwiperSlide key={index}>
                        <img width="510px" src={item.hinhAnh} />
                    </SwiperSlide>
                })}
            </Swiper> */}
        </div>
    )

}

