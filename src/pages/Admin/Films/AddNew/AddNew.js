import React, { useState } from 'react';
import { Form, Input, Button, Radio, DatePicker, InputNumber, Switch } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { GROUP_ID, USER_LOGIN } from '../../../../util/setting';
import { Redirect } from 'react-router-dom';
import { themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimActions';

const AddNew = () => {
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch()
    const [componentSize, setComponentSize] = useState('default');
    const [imgSrc, setImgSrc] = useState('')

    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {},
        },
        onSubmit: (values) => {
            console.log('values', values);
            values.maNhom = GROUP_ID
            // tạo đối tượng formData
            let formData = new FormData()
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key])
                } else {
                    formData.append('File', values.hinhAnh, values.hinhAnh.name)
                }
            }
            // console.log('formdata', formData.get('File'));
            dispatch(themPhimUploadHinhAction(formData))
        },
    });

    if (!localStorage.getItem(USER_LOGIN)) {
        alert('Bạn không có quyền truy cập vào trang này !')
        return <Redirect to='/' />
    }

    if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
        alert('Bạn không có quyền truy cập vào trang này !')
        return <Redirect to='/' />
    }

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const handleChangeDatePicker = (value) => {
        // console.log('handleChangeDatePicker',value);
        let ngayKhoiChieu = moment(value).format('DD/MM/YYYY')
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    }

    const handleChangeSwitchNumber = (name) => {
        return (value) => { formik.setFieldValue(name, value) }
    }

    const handleChangeFile = (e) => {
        // lấy file ra từ e
        let file = e.target.files[0]
        // console.log('file', file);
        if (file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg') {
            // tạo đối tượng để đọc file
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                // console.log(e.target.result);
                setImgSrc(e.target.result)
            }
            // đem dữ liệu file lưu vào formik
            formik.setFieldValue('hinhAnh', file)
        }
    }

    return (
        <Form
            onSubmitCapture={formik.handleSubmit}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            initialValues={{
                size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
        >
            <h3 className='text-2xl mb-4'>Thêm phim mới</h3>
            <Form.Item label="Form Size" name="size">
                <Radio.Group>
                    <Radio.Button value="small">Small</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="large">Large</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Tên phim">
                <Input name='tenPhim' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name='trailer' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input name='moTa' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu">
                <DatePicker onChange={handleChangeDatePicker} format={'DD/MM/YYYY'} />
            </Form.Item>
            <Form.Item label="Đang chiếu" valuePropName="checked">
                <Switch onChange={
                    // (value) => { formik.setFieldValue('dangChieu', value) }
                    handleChangeSwitchNumber('dangChieu')
                } />
            </Form.Item>
            <Form.Item label="Sắp chiếu" valuePropName="checked">
                <Switch onChange={handleChangeSwitchNumber('sapChieu')} />
            </Form.Item>
            <Form.Item label="Hot" valuePropName="checked">
                <Switch onChange={handleChangeSwitchNumber('hot')} />
            </Form.Item>
            <Form.Item label="Số sao">
                <InputNumber onChange={handleChangeSwitchNumber('danhGia')} min={1} max={10} />
            </Form.Item>
            <Form.Item label="Hình ảnh">
                <input type="file" onChange={handleChangeFile} accept='image/gif, image/jpg, image/jpeg, image/png' />
                <img style={{ width: 150, height: 150, marginTop: 20 }} src={imgSrc} alt="...Hình phim" />
            </Form.Item>
            <Form.Item>
                <button type='submit' className='p-2 bg-sky-300 rounded ml-44 text-lg'>Thêm phim</button>
            </Form.Item>
        </Form>
    );
};

export default AddNew