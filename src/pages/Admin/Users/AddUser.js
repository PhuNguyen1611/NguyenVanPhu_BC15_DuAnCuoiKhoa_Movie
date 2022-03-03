import { Button, Form, Input, Select } from 'antd';
import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachLoaiNguoiDungAction, themNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};

export default function AddUser(props) {
    const dispatch = useDispatch()
    const { loaiNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)

    useEffect(() => {
        const action = layDanhSachLoaiNguoiDungAction()
        dispatch(action)
    }, [])

    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            hoTen: '',
            email: '',
            soDT: '',
            maLoaiNguoiDung: '',
            maNhom: '',
        },
        onSubmit: (values) => {
            console.log('values', values);
            dispatch(themNguoiDungAction(values))
        },
    });
    const optionsLNG = () => {
        return loaiNguoiDung?.map((lnd, index) => {
            return { label: lnd.tenLoai, value: lnd.maLoaiNguoiDung }
        })
    }
    return (
        <div>
            <h3 className='text-2xl mb-4'>Thêm tài khoản</h3>
            <Form {...layout} onSubmitCapture={formik.handleSubmit}>
                <Form.Item label="Tài khoản" >
                    <Input name='taiKhoan' onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Mật khẩu" >
                    <Input.Password name='matKhau' onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Họ tên" >
                    <Input name='hoTen' onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Email" >
                    <Input name='email' onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Số điện thoại" >
                    <Input name='soDT' onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Mã nhóm" >
                    <Input name='maNhom' onChange={formik.handleChange} placeholder='GP00' />
                </Form.Item>
                <Form.Item label="Mã loại người dùng" >
                    <Select options={optionsLNG()} onChange={(value) => {
                        formik.setFieldValue('maLoaiNguoiDung', value)
                    }} />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
