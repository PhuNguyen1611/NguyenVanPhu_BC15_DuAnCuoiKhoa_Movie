import React, { useEffect } from 'react';
import { Tabs, Form, Input, Button, Select } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { capNhatThongTinTaiKhoanAction, layThongTinTaiKhoanAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { useFormik } from 'formik';
import { GROUP_ID } from '../../util/setting';

const { TabPane } = Tabs;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};

function callback(key) {
    console.log(key);
}

export default function Profile(props) {

    const dispatch = useDispatch()
    const { thongTinTaiKhoan } = useSelector(state => state.QuanLyNguoiDungReducer)

    useEffect(() => {
        const action = layThongTinTaiKhoanAction()
        dispatch(action)
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinTaiKhoan.taiKhoan,
            matKhau: thongTinTaiKhoan.matKhau,
            hoTen: thongTinTaiKhoan.hoTen,
            email: thongTinTaiKhoan.email,
            soDT: thongTinTaiKhoan.soDT,
            maLoaiNguoiDung: thongTinTaiKhoan.maLoaiNguoiDung,
            maNhom: thongTinTaiKhoan.maNhom,
        },
        onSubmit: (values) => {
            console.log('values', values);
            dispatch(capNhatThongTinTaiKhoanAction(values))
        },
    });
    const renderBookingTicketHistory = () => {
        return thongTinTaiKhoan.thongTinDatVe?.map((ticket, index) => {
            return <tr key={index}>
                <td>{index + 1}</td>
                <td><img src={ticket.hinhAnh} alt={ticket.tenPhim} className='w-[35px] h-[50px] sm:w-[40px] sm:h-[60px] md:w-[45px] md:w-[65px] lg:w-[50px] lg:h-[70px]' style={{ margin: '0 auto' }} /></td>
                <td className='w-60'><div className='font-semibold'>{ticket.tenPhim}</div></td>
                <td>{ticket.maVe}</td>
                <td>{moment(ticket.ngayDat).format('DD/MM/YYYY - hh:mm A')}</td>
                <td style={{ wordWrap: 'break-word' }} >{ticket.danhSachGhe?.map((ghe, index) => {
                    return <span className='px-1' key={index}>{ghe.tenGhe}
                        {(index + 1) % 6 === 0 ? <br /> : ''}
                    </span>
                })}</td>
                <td>{_.first(ticket.danhSachGhe).tenHeThongRap}</td>
                <td>{_.first(ticket.danhSachGhe).tenRap}</td>
            </tr>
        })
    }

    return <div style={{ minHeight: '100vh' }}>

        <div style={{ paddingTop: '100px', backgroundColor: 'white' }} className='container'>
            <Tabs onChange={callback} type="card">
                <TabPane tab={<div className='text-lg'>Thông tin cá nhân</div>} key="1">
                    <div className="m-2">
                        <Form {...layout} onSubmitCapture={formik.handleSubmit}>
                            <Form.Item label="Tài khoản" >
                                <Input name='taiKhoan' value={formik.values.taiKhoan} disabled={true} />
                            </Form.Item>
                            <Form.Item label="Mật khẩu" >
                                <Input.Password name='matKhau' onChange={formik.handleChange} value={formik.values.matKhau} />
                            </Form.Item>
                            <Form.Item label="Họ tên" >
                                <Input name='hoTen' onChange={formik.handleChange} value={formik.values.hoTen} />
                            </Form.Item>
                            <Form.Item label="Email" >
                                <Input name='email' onChange={formik.handleChange} value={formik.values.email} />
                            </Form.Item>
                            <Form.Item label="Số điện thoại" >
                                <Input name='soDT' onChange={formik.handleChange} value={formik.values.soDT} />
                            </Form.Item>
                            <Form.Item label="Mã loại người dùng" >
                                <Select options={[{ label: 'Khách Hàng', value: 'KhachHang' }, { label: 'Quản Trị', value: 'QuanTri' }]} onChange={(value) => {
                                    if (value === 'QuanTri') {
                                        alert('Khi chuyển thành Quản Trị, bạn sẽ có quyền truy cập vào trang admin tuy nhiên bạn không nên xóa phim và tài khoản sẵn có! Bạn nên đăng xuất và đăng nhập lại sau khi cập nhật thành công!');
                                    }
                                    return formik.setFieldValue('maLoaiNguoiDung', value)
                                }} value={formik.values.maLoaiNguoiDung} />
                            </Form.Item>
                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                <Button type="primary" htmlType="submit">
                                    Cập nhật
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </TabPane>
                <TabPane tab={<div className='text-lg'>Lịch sử đặt vé</div>} key="2">
                    <div className="flex flex-wrap m-2 justify-center">
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
                </TabPane>
            </Tabs>
        </div>


    </div>
}
