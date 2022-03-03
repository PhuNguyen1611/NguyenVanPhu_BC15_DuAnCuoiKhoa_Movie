import React from 'react'
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { dangKyAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { GROUP_ID } from '../../util/setting';
import * as Yup from 'yup'

export default function Register(props) {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDT: '',
            maNhom: GROUP_ID,
            hoTen: '',
            maLoaiNguoiDung: ''
        },
        validationSchema: Yup.object().shape({
            taiKhoan: Yup.string().required('*Username is invalid'),
            matKhau: Yup.string().required('*Password is invalid'),
            email: Yup.string().email('*Email is invalid').required('*Email is invalid'),
            soDT: Yup.string().required('*Phone Number is invalid'),
            hoTen: Yup.string().required('*Name is invalid'),
            maLoaiNguoiDung: Yup.string().required('*Type of Account is invalid')
        })
        ,
        onSubmit: values => {
            const action = dangKyAction(values);
            dispatch(action)
            console.log('values', values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="lg:w-1/2 xl:max-w-screen-sm bg-white">
            <div className="py-4 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
                <div className="flex items-center">
                    <div>
                        <svg className="w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 225 225" style={{ enableBackground: 'new 0 0 225 225' }} xmlSpace="preserve">
                            <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n                                        .st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                                    " }} />
                            <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                                <g>
                                    <path id="Layer0_0_1_STROKES" className="st0" d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8" />
                                </g>
                            </g>
                        </svg>
                    </div>
                    <NavLink to='/'>
                        <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold cursor-pointer">CYBERLEARN</div>
                    </NavLink>
                    <div className="text-2xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold ml-20">Register</div>
                </div>
            </div>
            <div className="px-12 sm:px-24 md:px-48 lg:px-12 xl:px-24 xl:max-w-2xl">
                <div>
                    <div className='flex justify-between items-center'>
                        <div className="text-sm font-bold text-gray-700 tracking-wide w-1/3">Username</div>
                        <div className='w-2/3'>
                            <input name='taiKhoan' onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Enter your username" />
                            {formik.errors.taiKhoan && formik.touched.taiKhoan ? (<div className='w-full text-red-500'>{formik.errors.taiKhoan}</div>) : null}
                        </div>

                    </div>
                    <div className="mt-3 flex justify-between items-center">
                        <div className="text-sm font-bold text-gray-700 tracking-wide w-1/3">
                            Password
                        </div>
                        <div className='w-2/3'>
                            <input name='matKhau' onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Enter your password" />
                            {formik.errors.matKhau && formik.touched.matKhau ? (<div className='w-full text-red-500'>{formik.errors.matKhau}</div>) : null}
                        </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                        <div className="text-sm font-bold text-gray-700 tracking-wide w-1/3">Email Address</div>
                        <div className='w-2/3'>
                            <input name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="mike@gmail.com" />
                            {formik.errors.email && formik.touched.email ? (<div className='w-full text-red-500'>{formik.errors.email}</div>) : null}
                        </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                        <div className="text-sm font-bold text-gray-700 tracking-wide w-1/3">
                            Phone Number
                        </div>
                        <div className='w-2/3'>
                            <input name='soDT' onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Enter your phone number" />
                            {formik.errors.soDT && formik.touched.soDT ? (<div className='w-full text-red-500'>{formik.errors.soDT}</div>) : null}
                        </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                        <div className="text-sm font-bold text-gray-700 tracking-wide w-1/3">
                            Name
                        </div>
                        <div className='w-2/3'>
                            <input name='hoTen' onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Enter your name" />
                            {formik.errors.hoTen && formik.touched.hoTen ? (<div className='w-full text-red-500'>{formik.errors.hoTen}</div>) : null}
                        </div>
                    </div>
                    {/* <div className="mt-3 flex justify-between items-center">
                        <div className="text-sm font-bold text-gray-700 tracking-wide w-1/3">
                            Type of Account
                        </div>
                        <div className='w-2/3'>
                            <select name='maLoaiNguoiDung' onChange={(event) => { return formik.setFieldValue('maLoaiNguoiDung', event.target.value) }} className='w-full text-lg py-2'>
                                <option hidden>Choose here</option>
                                <option value="KhachHang">Customer</option>
                                <option disabled value="QuanTri">Administrator</option>
                            </select>
                            {formik.errors.maLoaiNguoiDung && formik.touched.maLoaiNguoiDung ? (<div className='w-full text-red-500'>{formik.errors.maLoaiNguoiDung}</div>) : null}
                        </div>
                    </div> */}
                    <div className="flex justify-center mt-4">
                        <button type='submit' disabled={!formik.isValid} className="bg-indigo-500 text-gray-100 p-3 w-3/4 rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg text-lg">
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
