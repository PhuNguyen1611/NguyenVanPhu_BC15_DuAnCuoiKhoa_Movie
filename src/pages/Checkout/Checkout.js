/* eslint-disable import/no-anonymous-default-export */
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { datVeAction, layChiTietPhongVeAction } from '../../redux/actions/QuanLyDatVeAction';
import style from './Checkout.module.css'
import './Checkout.css'
import { CHANGE_TAB_ACTIVE, DAT_VE } from '../../redux/types/QuanLyDatVeType';
import _ from 'lodash'
import { ACCESS_TOKEN, USER_LOGIN } from '../../util/setting';
import { NavLink, Redirect } from 'react-router-dom';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { Tabs } from 'antd';
import { layThongTinTaiKhoanAction } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';
import { history } from '../../App';

const Checkout = React.memo(props => {
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDangDat } = useSelector(state => state.QuanLyDatVeReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        const action = layChiTietPhongVeAction(props.match.params.id)
        dispatch(action)
    }, [])

    if (!localStorage.getItem(USER_LOGIN)) {
        return <Redirect to='/login' />
    }

    // console.log({ chiTietPhongVe, danhSachGheDangDat });

    const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

    const renderGhe = () => {
        return danhSachGhe.map((ghe, index) => {
            let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
            let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
            let classGheVipDaDat = ghe.loaiGhe === 'Vip' & ghe.daDat === true ? 'gheVipDaDat' : '';
            let classGheDangDat = '';
            // Kiểm tra từng ghế render xem có trong mảng ghế đang đặt hay không
            let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe)
            // kiểm tra từng ghể render xem có phải ghế khách đang đặt hay không
            let classGheKhachDangDat = ''
            let indexGheKhachDD = danhSachGheKhachDangDat.findIndex(gheKhachDD => gheKhachDD.maGhe === ghe.maGhe)
            if (indexGheKhachDD !== -1) {
                classGheKhachDangDat = 'gheKhachDangDat'
            }
            let classGheMinhDat = ''
            if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
                classGheMinhDat = 'gheMinhDat'
            }
            if (indexGheDD !== -1) {
                classGheDaDat = 'gheDangDat'
            }
            return <Fragment key={index}>
                {/* {ghe.loaiGhe === 'Vip' ? <button className={`${style['ghe']} ${style['gheVip']}`} key={index}>{ghe.stt}</button> : <button className={`${style['ghe']}`} key={index}>{ghe.stt}</button>} */}
                <button onClick={() => {
                    dispatch({
                        type: DAT_VE,
                        gheDuocChon: ghe
                    })
                }} disabled={ghe.daDat || classGheKhachDangDat !== ''} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheVipDaDat} ${classGheDangDat} ${classGheKhachDangDat} ${classGheMinhDat} `}>
                    {ghe.daDat ? classGheMinhDat === 'gheMinhDat' ? <i className="fas fa-user"></i> : <i className="fas fa-ban"></i> : classGheKhachDangDat !== '' ? <i className="far fa-pause-circle"></i> : ghe.stt}
                </button>
                {(index + 1) % 16 === 0 ? <br /> : ''}
            </Fragment>
        })
    }

    return (
        <div className='min-h-screen'>
            <div className="md:grid md:grid-cols-12 flex flex-col">
                <div className="col-span-9">
                    <div className="flex flex-col items-center ">
                        <div className="bg-black w-full sm:w-11/12 lg:w-4/5" style={{ height: 12 }}>
                        </div>
                        <div className={`${style['trapezoid']}`}>
                        </div>
                        <h3 className="-mt-7">Màn hình</h3>
                        <div className='mt-2'>
                            {renderGhe()}
                        </div>
                    </div>
                    <div className="flex justify-center mt-1">
                        <table className="w-4/5 text-center divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th>Ghế thường</th>
                                    <th>Ghế Vip</th>
                                    <th>Ghế đã đặt</th>
                                    <th>Ghế đang đặt</th>
                                    <th>Ghế khách đang đặt</th>
                                    <th>Ghế mình đặt</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td>
                                        <button disabled={true} className='ghe'></button>
                                    </td>
                                    <td>
                                        <button disabled={true} className='ghe gheVip'></button>
                                    </td>
                                    <td>
                                        <button disabled={true} className='ghe gheDaDat'><i className="fas fa-ban"></i></button>
                                        <button disabled={true} className='ghe gheVipDaDat'><i className="fas fa-ban"></i></button>
                                    </td>
                                    <td>
                                        <button disabled={true} className='ghe gheDangDat'></button>
                                    </td>
                                    <td>
                                        <button disabled={true} className='ghe gheKhachDangDat'><i className="far fa-pause-circle"></i></button>
                                    </td>
                                    <td>
                                        <button disabled={true} className='ghe gheMinhDat'><i className="fas fa-user"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-3 px-3">
                    <h3 className="text-green-400 text-center text-2xl">
                        {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                            return tongTien += ghe.giaVe
                        }, 0).toLocaleString()} đ
                    </h3>
                    <hr />
                    <div className='my-3'>
                        <h3 className="text-xl md:text-2xl">{thongTinPhim.tenPhim}</h3>
                        <p className='mb-1'>Địa điểm: {thongTinPhim.diaChi}</p>
                        <p className='mb-0'>Ngày chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu} {thongTinPhim.tenRap}</p>
                    </div>

                    <hr />
                    <div className="flex flex-row mt-3">
                        <div className="w-2/5">
                            <span className="text-red-400 text-lg font-semibold">Ghế</span>

                        </div>
                        <div className="text-right w-3/5">
                            <span className="text-green-800 text-lg">
                                {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                                    return tongTien += ghe.giaVe
                                }, 0).toLocaleString()} đ</span>
                        </div>

                    </div>
                    <div className='mb-3'>
                        {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
                            return <span key={index} className='text-green-500 text-lg font-semibold mr-2 break-all'>
                                {gheDD.stt}
                            </span>
                        })}
                    </div>
                    <hr />
                    <div className="my-3">
                        <p className='mb-1 font-semibold'>Email</p>
                        <p className='mb-0'>{userLogin.email}</p>
                    </div>
                    <hr />
                    <div className="my-3">
                        <p className='mb-1 font-semibold'>Phone</p>
                        <p className='mb-0'>{userLogin.soDT}</p>
                    </div>
                    <hr />
                    <div className="my-3">
                        <p className='mb-1 font-semibold'>Chọn hình thức thanh toán</p>
                    </div>
                    <div className="flex flex-col justify-end items-center">
                        <div onClick={() => {
                            const thongTinDatVe = new ThongTinDatVe()
                            thongTinDatVe.maLichChieu = props.match.params.id
                            thongTinDatVe.danhSachVe = danhSachGheDangDat
                            console.log(thongTinDatVe);
                            dispatch(datVeAction(thongTinDatVe))
                        }} className="bg-green-500 text-white w-full text-center py-2 font-bold text-md sm:text-lg md:text-xl rounded-md cursor-pointer">
                            ĐẶT VÉ
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

const { TabPane } = Tabs;

export default function (props) {
    const dispatch = useDispatch()
    const { tabActive } = useSelector(state => state.QuanLyDatVeReducer)
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)

    useEffect(() => {
        return () => {
            dispatch({
                type: CHANGE_TAB_ACTIVE,
                number: '1'
            })
        }
    }, [])

    const operations = <Fragment>
        {!_.isEmpty(userLogin) ? <Fragment> <NavLink to='/profile' className='text-blue-500'>Hello! {userLogin.taiKhoan}</NavLink><button onClick={() => {
            localStorage.removeItem(USER_LOGIN)
            localStorage.removeItem(ACCESS_TOKEN)
            history.push('/')
            window.location.reload()
        }} className='mx-3 text-red-500'>Đăng xuất</button></Fragment> : ''}
    </Fragment>

    return <div className='bg-white'>
        <Tabs tabBarExtraContent={operations} defaultActiveKey="1" activeKey={tabActive} onChange={(key) => {
            // console.log('key', key);
            dispatch({
                type: CHANGE_TAB_ACTIVE,
                number: key.toString()
            })
        }}>
            <TabPane tab={<div className='px-1 sm:px-3 text-[10px] sm:text-[12px] md:text-[14px]'>01 CHỌN GHẾ & THANH TOÁN</div>} key="1">
                <Checkout {...props} />
            </TabPane>
            <TabPane tab={<div className='px-1 sm:px-3 text-[10px] sm:text-[12px] md:text-[14px]'>02 KẾT QUẢ ĐẶT VÉ</div>} key="2">
                <KetQuaDatVe {...props} />
            </TabPane>
            <TabPane tab={<NavLink to='/' className='px-1 sm:px-3 text-[10px] sm:text-[12px] md:text-[14px] text-dark h-full'>TRỞ VỀ TRANG CHỦ</NavLink>}>
            </TabPane>
        </Tabs>
    </div>
}

const KetQuaDatVe = React.memo((props) => {

    const dispatch = useDispatch()
    const { thongTinTaiKhoan } = useSelector(state => state.QuanLyNguoiDungReducer)

    useEffect(() => {
        const action = layThongTinTaiKhoanAction()
        dispatch(action)
    }, [])

    // console.log('thongTinNguoiDung', thongTinTaiKhoan);

    const renderBookingTicketHistory = () => {
        return thongTinTaiKhoan.thongTinDatVe?.map((ticket, index) => {
            return <tr key={index}>
                <td>{index + 1}</td>
                <td><img src={ticket.hinhAnh} alt={ticket.tenPhim} className='w-[35px] h-[50px] sm:w-[40px] sm:h-[60px] md:w-[45px] md:w-[65px] lg:w-[50px] lg:h-[70px]' style={{ margin: '0 auto' }} /></td>
                <td className='w-60'><div className='font-semibold'>{ticket.tenPhim}</div></td>
                <td>{ticket.maVe}</td>
                <td>{moment(ticket.ngayDat).format('DD/MM/YYYY - hh:mm A')}</td>
                <td style={{ width: 200, wordWrap: 'break-word' }}>{ticket.danhSachGhe?.map((ghe, index) => {
                    return <span className='px-1' key={index}>{ghe.tenGhe}
                        {(index + 1) % 6 === 0 ? <br /> : ''}</span>
                })}</td>
                <td>{_.first(ticket.danhSachGhe).tenHeThongRap}</td>
                <td>{_.first(ticket.danhSachGhe).tenRap}</td>
            </tr>
        })
    }

    return <div>
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-2 mx-auto">
                <div className="flex flex-col text-center w-full mb-4">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">LỊCH SỬ ĐẶT VÉ</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Chúc quý khách xem phim vui vẻ!</p>
                </div>
                <div className="flex flex-wrap -m-2 justify-center">
                    <table className="w-full text-center divide-y divide-gray-200 scale-[0.7] sm:scale-[1]">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className='px-2'>STT</th>
                                <th>Hình ảnh</th>
                                <th>Tên phim</th>
                                <th>Mã vé</th>
                                <th>Ngày đặt</th>
                                <th>Số ghế</th>
                                <th>Hệ thống rạp</th>
                                <th>Tên rạp</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {renderBookingTicketHistory()}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </div>
})