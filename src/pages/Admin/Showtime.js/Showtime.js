/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Form, Button, DatePicker, InputNumber, Select } from 'antd';
import { quanLyRapServices } from '../../../services/QuanLyRapServices';
import { useFormik } from 'formik';
import moment from 'moment';
import { quanLyDatVeServices } from '../../../services/QuanLyDatVeServices';



export default function Showtime(props) {

    const formik = useFormik({
        initialValues: {
            maPhim: props.match.params.id,
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: '',
        },
        onSubmit: async (values) => {
            console.log('values', values)
            try {
                const result = await quanLyDatVeServices.taoLichChieu(values)
                alert(result.data.content)
            } catch (error) {
                console.log('error', error.response?.data)
            }
        }
    })

    const [state, setState] = useState({
        heThongRapChieu: [],
        cumRapChieu: []
    })

    console.log(state.heThongRapChieu)

    useEffect(async () => {
        try {
            let result = await quanLyRapServices.layThongTinHeThongRap()
            setState({
                ...state,
                heThongRapChieu: result.data.content
            })

        } catch (error) {
            console.log('error', error)
        }
    }, [])

    const optionsHTR = () => {
        return state.heThongRapChieu?.map((htr, index) => {
            return { label: htr.tenHeThongRap, value: htr.maHeThongRap }
        })
    }

    const optionsCR = () => {
        return state.cumRapChieu?.map((cr, index) => {
            return { label: cr.tenCumRap, value: cr.maCumRap }
        })
    }

    const handleChageHeThongRap = async (value) => {
        try {
            let result = await quanLyRapServices.layThongTinCumRap(value)
            setState({
                ...state,
                cumRapChieu: result.data.content
            })
        } catch (error) {
            console.log(error.response?.data)
        }
    }

    const handleChageCumRap = async (value) => {
        formik.setFieldValue('maRap', value)
    }

    function onChangeDate(value) {
        formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY HH:mm:ss'))
        console.log('onChangeDate: ', value);
    }

    function onOk(value) {
        formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY HH:mm:ss'))
        console.log('onOk: ', value);
    }

    function onChangeGiaVe(value) {
        formik.setFieldValue('giaVe', value)
        console.log('onChangeGiaVe', value);
    }

    let film = {}
    if (localStorage.getItem('filmParams')) {
        film = JSON.parse(localStorage.getItem('filmParams'))
    }

    return <div className='flex flex-row'>
        <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            initialValues={{ remember: true }}
            onSubmitCapture={formik.handleSubmit}
            className='w-4/5'
        >
            <h3 className='text-2xl mb-5'>T???o l???ch chi???u - {props.match.params.tenphim}</h3>

            <Form.Item label="H??? th???ng r???p">
                <Select options={optionsHTR()} onChange={handleChageHeThongRap} placeholder="Ch???n h??? th???ng r???p" />
            </Form.Item>
            <Form.Item label="C???m r???p">
                <Select options={optionsCR()} onChange={handleChageCumRap} placeholder="Ch???n c???m r???p" />
            </Form.Item>
            <Form.Item label="Ng??y chi???u - Gi??? chi???u">
                <DatePicker format={'DD/MM/YYYY HH:mm:ss'} showTime onChange={onChangeDate} onOk={onOk} />
            </Form.Item>
            <Form.Item label="Gi?? v??">
                <InputNumber min={75000} max={150000} step={1000} defaultValue={75000} onChange={onChangeGiaVe} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        <img className='w-1/5' src={film.hinhAnh} alt="..." style={{ width: 220, height: 300 }} />
    </div>;
}
