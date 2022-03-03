import React, { useEffect } from 'react'
import HomeMenu from './HomeMenu/HomeMenu'
import { useDispatch, useSelector } from 'react-redux'
import MultipleRows from '../../components/ReactSlick/MultipleRowSlick'
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimActions'
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapActions'
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel'

export default function Home(props) {
    const { arrPhim } = useSelector(state => state.QuanLyPhimReducer)
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(layDanhSachPhimAction())
        dispatch(layDanhSachHeThongRapAction())
    }, [])

    return (
        <div>
            <HomeCarousel />
            <section className="text-gray-600 body-font bg-[#081b27]">
                <div className="container px-5 py-8 mx-auto">
                    <MultipleRows arrPhim={arrPhim} />
                </div>
            </section>
            <HomeMenu heThongRapChieu={heThongRapChieu} />
        </div>
    )
}
