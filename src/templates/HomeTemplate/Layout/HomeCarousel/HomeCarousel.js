/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { DOMAIN, KEY_TOKEN_CYBERSOFT, TOKEN_CYBERSOFT } from '../../../../util/setting';
import { getCarouselAction } from '../../../../redux/actions/CarouselActions';

export default function HomeCarousel(props) {

    const { arrImgCarousel } = useSelector(state => state.CarouselReducer)
    const dispatch = useDispatch();

    useEffect(//async
        () => {
            // try {
            //     const result = await axios({
            //         url: `${DOMAIN}/api/QuanLyPhim/LayDanhSachBanner`,
            //         method: 'GET',
            //         headers: { [KEY_TOKEN_CYBERSOFT]: TOKEN_CYBERSOFT }
            //     })

            //     console.log('result', result)

            //     dispatch({
            //         type: 'GET_CAROUSEL',
            //         arrImgCarousel: result.data.content
            //     })
            // } catch (errors) {
            //     console.log('error', errors)
            // }
            const action = getCarouselAction()
            dispatch(action)
        }, [])

    const contentStyle = {
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
        backgroundRepeat: 'no-repeat',
    };

    const renderImg = () => {
        return arrImgCarousel.map((item, index) => {

            return <div key={index}>
                <div style={{ ...contentStyle }}>
                    <img src={item.hinhAnh} className='w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[650px]' alt="" />
                </div>
            </div>
        })
    }

    return (
        <Carousel autoplay>
            {renderImg()}
        </Carousel>
    )
}
