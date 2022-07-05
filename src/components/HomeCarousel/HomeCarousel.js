import { Button } from 'antd';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import "../../assets/style/reset.scss";
import { useSelector, useDispatch } from 'react-redux';
import { Carousel } from 'antd';
import { LayDanhSachBanner } from '../../action/CarouselAction';

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
                <div className='carousel' style={{ backgroundImage: `url(${item.hinhAnh})` }}></div>
            </div>
        })
    }

    return (
        <HomeCarouselStyled>
            <Carousel effect="fade">
                {RenderCarousel()}
            </Carousel>
        </HomeCarouselStyled>
    )
}

const HomeCarouselStyled = styled.div`

    .carousel {
        background-size  : cover;
        background-repeat: no-repeat;
        background-position: bottom;
        width            : 100%;
        height           : 100vh;
        align-items: flex-end;
        height: '160px';
        color: '#fff';
        lineHeight: '160px';
        textAlign: 'center';
        background: '#364d79';

        .content {
            .name {
                color: #fff;
            }
        }
    }

    .slick-dots {
        width: auto;
    }
`