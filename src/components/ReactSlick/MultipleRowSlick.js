import React, { Component } from "react";
import Slider from "react-slick";
import Film from "../Film/Film";
import styleSlick from './MultipleRowSlick.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { GET_DANH_SACH_PHIM, GET_PHIM_DANG_CHIEU, GET_PHIM_SAP_CHIEU } from "../../redux/types/QuanLyPhimType";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimActions";
import { Input } from "antd";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-next']}`}
            style={{ ...style, display: "block", marginRight: '15px' }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{ ...style, display: "block", marginLeft: '-10px' }}
            onClick={onClick}
        />
    );
}


const MultipleRows = (props) => {

    const dispatch = useDispatch()
    const { Search } = Input;
    const onSearch = value => {
        console.log(value)
        dispatch(layDanhSachPhimAction(value))
    };


    const renderPhim = () => {
        // return props.arrPhim.slice(0, 18).map((phim, index) => {
        return props.arrPhim.map((phim, index) => {

            // return <div className={`mb-4 p-2 ${styleSlick['width-item']}`} key={index}>
            //     <div className="h-full bg-gray-100 bg-opacity-75 px-2 pt-2 pb-4 rounded-lg overflow-hidden text-center relative">
            //         <div style={{ background: `url(${phim.hinhAnh}),url(https://picsum.photos/300) no-repeat`, backgroundPosition: 'center', backgroundSize: 'cover,cover' }}>
            //             <img src={phim.hinhAnh} alt={phim.tenPhim} className="opacity-0 w-full" style={{ height: '300px' }} />
            //         </div>
            //         <h2 className="tracking-widest title-font text-gray-900 mt-3 p-2 text-xl h-16">{phim.tenPhim}</h2>
            //         <p className="leading-relaxed px-3 text-gray-900 h-16">{phim.moTa.length > 70 ? <span>{phim.moTa.slice(0, 70)} ...</span> : <span>{phim.moTa}</span>}</p>
            //         <button className="self-center px-6 py-2 font-semibold rounded text-xl text-white mt-2 bg-violet-600 hover:bg-violet-800 focus:outline-none focus:ring focus:ring-violet-300">Book Ticket</button>
            //     </div>
            // </div>

            return <div className={`mb-4 p-2  ${styleSlick['width-item']}`} key={index}>
                <Film phim={phim} />
            </div>
        })
    }

    const settings = {
        className: "container variable-width",
        centerMode: false,
        infinite: false,
        centerPadding: "0px",
        slidesToShow: 4,
        speed: 500,
        rows: 1,
        slidesPerRow: 2,
        variableWidth: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    rows: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    rows: 2
                }
            },
        ]
    };

    return (
        <div>
            <ul className="nav nav-pills px-9 py-2 items-center" style={{ color: '#1890ff' }}>
                <li className="nav-item">
                    <a className="nav-link uppercase text-lg font-semibold" data-toggle="pill" href="#pills-llus" onClick={() => {
                        const action = {
                            type: GET_PHIM_DANG_CHIEU
                        }
                        dispatch(action)
                    }}>Now Showing</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link uppercase text-lg font-semibold" data-toggle="pill" href="#pills-photo" onClick={() => {
                        const action = {
                            type: GET_PHIM_SAP_CHIEU
                        }
                        dispatch(action)
                    }}>Coming soon</a>
                </li>
                <li className="ml-auto mr-1">
                    <Search className='my-3 ' style={{ width: 200 }} placeholder="Search" allowClear onSearch={onSearch} enterButton />
                </li>
            </ul>
            <div className="tab-content">
                <div className="tab-pane container active" id="pills-all">
                    <Slider {...settings}>
                        {renderPhim()}
                    </Slider>
                </div>
                <div className="tab-pane container" id="pills-llus">
                    <Slider {...settings}>
                        {renderPhim()}
                    </Slider>
                </div>
                <div className="tab-pane container" id="pills-photo">
                    <Slider {...settings}>
                        {renderPhim()}
                    </Slider>
                </div>

            </div>
        </div>
    );

}

export default MultipleRows;