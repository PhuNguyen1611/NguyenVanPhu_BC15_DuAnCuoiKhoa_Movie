import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, DatePicker, InputNumber, Switch } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { GROUP_ID, USER_LOGIN } from '../../../../util/setting';
import { Redirect } from 'react-router-dom';
import { capNhatPhimUploadAction, layThongTinPhimAction } from '../../../../redux/actions/QuanLyPhimActions';

const Edit = (props) => {
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const [componentSize, setComponentSize] = useState('default');
    const [imgSrc, setImgSrc] = useState('')
    const { thongTinPhim } = useSelector(state => state.QuanLyPhimReducer)
    const dispatch = useDispatch()

    console.log('thongTinPhim', thongTinPhim);

    useEffect(() => {
        let { id } = props.match.params
        dispatch(layThongTinPhimAction(id))
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: thongTinPhim.maPhim,
            tenPhim: thongTinPhim.tenPhim,
            trailer: thongTinPhim.trailer,
            moTa: thongTinPhim.moTa,
            ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
            dangChieu: thongTinPhim.dangChieu,
            sapChieu: thongTinPhim.sapChieu,
            hot: thongTinPhim.hot,
            danhGia: thongTinPhim.danhGia,
            hinhAnh: null,
            maNhom: 'GP01'
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
                    if (values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name)
                    }
                }
            }
            dispatch(capNhatPhimUploadAction(formData))
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

    const handleChangeFile = async (e) => {
        // lấy file ra từ e
        let file = e.target.files[0]
        // console.log('file', file);
        if (file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg') {
            // đem dữ liệu file lưu vào formik
            await formik.setFieldValue('hinhAnh', file)
            // tạo đối tượng để đọc file
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                // console.log(e.target.result);
                setImgSrc(e.target.result)
            }
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
            <h3 className='text-2xl mb-4'>Edit phim</h3>
            <Form.Item label="Form Size" name="size">
                <Radio.Group>
                    <Radio.Button value="small">Small</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="large">Large</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Tên phim">
                <Input name='tenPhim' onChange={formik.handleChange} value={formik.values.tenPhim} />
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name='trailer' onChange={formik.handleChange} value={formik.values.trailer} />
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input name='moTa' onChange={formik.handleChange} value={formik.values.moTa} />
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu">
                <DatePicker onChange={handleChangeDatePicker} value={moment(formik.values.ngayKhoiChieu)} format={'DD/MM/YYYY'} />
            </Form.Item>
            <Form.Item label="Đang chiếu">
                <Switch onChange={
                    // (value) => { formik.setFieldValue('dangChieu', value) }
                    handleChangeSwitchNumber('dangChieu')
                } checked={formik.values.dangChieu} />
            </Form.Item>
            <Form.Item label="Sắp chiếu" >
                <Switch onChange={handleChangeSwitchNumber('sapChieu')} checked={formik.values.sapChieu} />
            </Form.Item>
            <Form.Item label="Hot" >
                <Switch onChange={handleChangeSwitchNumber('hot')} checked={formik.values.hot} />
            </Form.Item>
            <Form.Item label="Số sao">
                <InputNumber onChange={handleChangeSwitchNumber('danhGia')} min={1} max={10} value={formik.values.danhGia} />
            </Form.Item>
            <Form.Item label="Hình ảnh">
                <input type="file" onChange={handleChangeFile} accept='image/gif, image/jpg, image/jpeg, image/png' />
                <img style={{ width: 150, height: 150, marginTop: 20 }} src={imgSrc === '' ? thongTinPhim.hinhAnh : imgSrc} alt="...Hình phim" />
            </Form.Item>
            <Form.Item>
                <button type='submit' className='p-2 bg-sky-300 rounded ml-44 text-lg'>Cập nhật</button>
            </Form.Item>
        </Form>
    );
};

export default Edit