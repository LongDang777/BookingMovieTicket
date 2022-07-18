import React, { useEffect } from 'react';
import "../../assets/style/reset.scss";
import { useSelector, useDispatch } from 'react-redux';
import { LayDanhSachBanner } from '../../action/CarouselAction';
import Carousel from 'better-react-carousel'
import { Navigation, Pagination, Scrollbar, A11y ,Virtual} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import dietQuy from '../../assets/img/dietQuy.png'
import latMat from '../../assets/img/latMat.png'
import minions from '../../assets/img/minions.jpg'
import sinhTu from '../../assets/img/sinhTu.png'
import thor from '../../assets/img/thor.jpg'


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

    const bannerImg = [


    ]

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
                // install Swiper modules
                modules={[Virtual, Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                // scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >

                 {arrBanner.map((item, index) => {
                    return <SwiperSlide key={index}>
                        <img width="100%" src={item.hinhAnh} />
                    </SwiperSlide>
                })} 
                <SwiperSlide><img src={dietQuy}/></SwiperSlide>
                <SwiperSlide><img src={latMat}/></SwiperSlide>
                <SwiperSlide><img src={minions}/></SwiperSlide>
                <SwiperSlide><img src={sinhTu}/></SwiperSlide>
                <SwiperSlide><img src={thor}/></SwiperSlide>
            </Swiper> */}
        </div>
    )

}

