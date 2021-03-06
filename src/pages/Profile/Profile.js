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
    // console.log(key);
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
                <TabPane tab={<div className='text-lg'>Th??ng tin c?? nh??n</div>} key="1">
                    <div className="m-2">
                        <Form {...layout} onSubmitCapture={formik.handleSubmit}>
                            <Form.Item label="T??i kho???n" >
                                <Input name='taiKhoan' value={formik.values.taiKhoan} disabled={true} />
                            </Form.Item>
                            <Form.Item label="M???t kh???u" >
                                <Input.Password name='matKhau' onChange={formik.handleChange} value={formik.values.matKhau} />
                            </Form.Item>
                            <Form.Item label="H??? t??n" >
                                <Input name='hoTen' onChange={formik.handleChange} value={formik.values.hoTen} />
                            </Form.Item>
                            <Form.Item label="Email" >
                                <Input name='email' onChange={formik.handleChange} value={formik.values.email} />
                            </Form.Item>
                            <Form.Item label="S??? ??i???n tho???i" >
                                <Input name='soDT' onChange={formik.handleChange} value={formik.values.soDT} />
                            </Form.Item>
                            <Form.Item label="M?? lo???i ng?????i d??ng" >
                                <Select options={[{ label: 'Kh??ch H??ng', value: 'KhachHang' }, { label: 'Qu???n Tr???', value: 'QuanTri' }]} onChange={(value) => {
                                    if (value === 'QuanTri') {
                                        alert('Khi chuy???n th??nh Qu???n Tr???, b???n s??? c?? quy???n truy c???p v??o trang admin tuy nhi??n b???n kh??ng n??n x??a phim v?? t??i kho???n s???n c??! B???n n??n ????ng xu???t v?? ????ng nh???p l???i sau khi c???p nh???t th??nh c??ng!');
                                    }
                                    return formik.setFieldValue('maLoaiNguoiDung', value)
                                }} value={formik.values.maLoaiNguoiDung} />
                            </Form.Item>
                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                <Button type="primary" htmlType="submit">
                                    C???p nh???t
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </TabPane>
                <TabPane tab={<div className='text-lg'>L???ch s??? ?????t v??</div>} key="2">
                    <div className="flex flex-wrap m-2 justify-center">
                        <table className="w-full text-center divide-y divide-gray-200 scale-[0.7] sm:scale-[1]">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className='px-2'>STT</th>
                                    <th>H??nh ???nh</th>
                                    <th>T??n phim</th>
                                    <th>M?? v??</th>
                                    <th>Ng??y ?????t</th>
                                    <th>S??? gh???</th>
                                    <th>H??? th???ng r???p</th>
                                    <th>T??n r???p</th>
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
