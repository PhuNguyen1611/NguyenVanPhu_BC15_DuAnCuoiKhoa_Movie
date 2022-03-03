import React, { useEffect } from 'react';
import './circle.css'
import { Tabs, Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapActions';
import moment from 'moment';
import { NavLink } from 'react-router-dom';


const { TabPane } = Tabs;

export default function Detail(props) {

    const phimDetail = useSelector(state => state.QuanLyPhimReducer.phimDetail)

    console.log({ phimDetail });

    const dispatch = useDispatch()

    useEffect(() => {

        let { id } = props.match.params

        dispatch(layThongTinChiTietPhim(id))

    }, [])

    return (
        <div style={{ backgroundImage: `url(${phimDetail.hinhAnh})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', minHeight: '100vh' }}>
            <div style={{
                minHeight: '100vh',
                background: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(20px)'
            }}>
                <div style={{ paddingTop: '150px' }} className='grid grid-cols-12 text-white'>

                    <div className='col-span-6 col-start-3'>
                        <div className='grid grid-cols-4 items-start'>
                            <img className='col-span-3 lg:col-span-1 ' src={phimDetail.hinhAnh} style={{ width: '200px', height: '250px' }} alt="" />
                            <div className='col-span-4 lg:col-span-3 ml-3'>
                                <p className='text-md lg:text-lg'>Ngày chiếu: {moment(phimDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                                <p className='text-lg md:text-xl lg:text-2xl xl:text-4xl mb-3'>{phimDetail.tenPhim}</p>
                                <p>{phimDetail.moTa}</p>
                            </div>
                        </div>
                    </div>

                    <div className='col-span-3 col-start-9 flex flex-col items-center'>
                        <h1 className='lg:text-[16px]' style={{ color: 'yellow', fontWeight: 'bold' }}>Đánh giá</h1>
                        <h1 className='text-green-500 mb-0'><Rate allowHalf value={phimDetail.danhGia / 2} style={{ color: '#78ed78', fontSize: 16 }} /></h1>
                        <div style={{}} className={`c100 p${phimDetail.danhGia * 10} scale-[0.5] lg:scale-[0.6] big green -mt-5`}>
                            <span style={{ color: '#22c55e' }}>{phimDetail.danhGia}</span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>
                            </div>
                        </div>
                        <div className="leading-none flex justify-center w-full -mt-5">
                            <span className="text-green-400 mr-3 inline-flex items-center leading-none text-lg pr-3 ">
                                <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx={12} cy={12} r={3} />
                                </svg>1.2K
                            </span>
                            <span className="text-green-400 inline-flex items-center leading-none text-lg">
                                <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                </svg>20
                            </span>
                        </div>
                    </div>
                </div>

                <div className='mt-20 container w-2/3 bg-white p-0 lg:p-3'>
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab={<div className='text-md lg:text-lg font-semibold'>Lịch chiếu</div>} key="1">
                            <div>
                                <Tabs tabPosition={'left'}>
                                    {phimDetail.heThongRapChieu?.map((htr, index) => {
                                        return <TabPane tab={
                                            <div className='flex items-center'>
                                                <img className='w-[40px] sm:w-[50px]' src={htr.logo} alt={htr.tenHeThongRap} />
                                                <p className='text-md mb-0 ml-2 text-wrap w-[50px] sm:w-[auto]'>{htr.tenHeThongRap}</p>
                                            </div>
                                        } key={index} >
                                            {htr.cumRapChieu?.map((cumRap, index) => {
                                                return <div className='mt-2 mb-5' key={index}>
                                                    <div className='flex flex-row'>
                                                        <img className='w-[40px] sm:w-[50px] h-[40px] sm:h-[50px]' src={cumRap.hinhAnh} alt={cumRap.tenCumRap} />
                                                        <div className='ml-2'>
                                                            <p className='text-md sm:text-lg lg:text-xl mb-0 font-semibold text-wrap'>{cumRap.tenCumRap}</p>
                                                            <p className='text-wrap'>{cumRap.diaChi}</p>
                                                        </div>
                                                    </div>
                                                    <div className='grid grid-cols-4'>
                                                        {cumRap.lichChieuPhim?.map((lichChieu, index) => {
                                                            return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className='col-span-1 hover:text-sky-500 text-black cursor-pointer text-wrap text-md lg:text-lg'>
                                                                {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                            </NavLink>
                                                        })}
                                                    </div>
                                                </div>
                                            })}
                                        </TabPane>
                                    })}
                                </Tabs>
                            </div>
                        </TabPane>
                        <TabPane tab={<div className='text-md lg:text-lg font-semibold'>Thông tin</div>} key="2">
                            Thông tin
                        </TabPane>
                        <TabPane tab={<div className='text-md lg:text-lg font-semibold'>Đánh giá</div>} key="3">
                            Đánh giá
                        </TabPane>
                    </Tabs>
                </div>

            </div>
        </div>
    )
}


