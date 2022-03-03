import { Button, Form, Input, Select } from 'antd';
import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatThongTinNguoiDungAction, layDanhSachLoaiNguoiDungAction, layThongTinNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};

export default function EditUser(props) {
    const dispatch = useDispatch()
    const { loaiNguoiDung, thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)

    useEffect(() => {
        let { taiKhoan } = props.match.params
        dispatch(layThongTinNguoiDungAction(taiKhoan))
        dispatch(layDanhSachLoaiNguoiDungAction())
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinNguoiDung.taiKhoan,
            matKhau: thongTinNguoiDung.matKhau,
            hoTen: thongTinNguoiDung.hoTen,
            email: thongTinNguoiDung.email,
            soDT: thongTinNguoiDung.soDT,
            maLoaiNguoiDung: thongTinNguoiDung.maLoaiNguoiDung,
            maNhom: thongTinNguoiDung.maNhom,
        },
        onSubmit: (values) => {
            console.log('values', values);
            dispatch(capNhatThongTinNguoiDungAction(values))
        },
    });
    const optionsLNG = () => {
        return loaiNguoiDung?.map((lnd, index) => {
            return { label: lnd.tenLoai, value: lnd.maLoaiNguoiDung }
        })
    }
    console.log(thongTinNguoiDung)
    return (
        <div>
            <h3 className='text-2xl mb-4'>Chỉnh sữa tài khoản - {thongTinNguoiDung.taiKhoan}</h3>
            <Form {...layout} onSubmitCapture={formik.handleSubmit}>
                <Form.Item label="Tài khoản" >
                    <Input name='taiKhoan' onChange={formik.handleChange} value={formik.values.taiKhoan} disabled />
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
                <Form.Item label="Mã nhóm" >
                    <Input name='maNhom' onChange={formik.handleChange} placeholder='GP00' value={formik.values.maNhom} />
                </Form.Item>
                <Form.Item label="Mã loại người dùng" >
                    <Select options={optionsLNG()} onChange={(value) => {
                        formik.setFieldValue('maLoaiNguoiDung', value)
                    }} value={formik.values.maLoaiNguoiDung} />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
