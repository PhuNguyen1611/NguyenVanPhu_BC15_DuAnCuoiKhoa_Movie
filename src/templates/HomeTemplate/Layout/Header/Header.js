import React, { Fragment, Suspense, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { history } from '../../../../App';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { ACCESS_TOKEN, USER_LOGIN } from '../../../../util/setting';

export default function Header(props) {
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    const { t, i18n } = useTranslation()
    const handleChange = (value) => {
        i18n.changeLanguage(value)
    }
    const [showNav, setShowNav] = useState(false)
    const { Option } = Select;
    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>
                <button onClick={() => {
                    history.push('/login')
                }} className="self-center px-6 py-2 rounded">{t('Sign in')}</button>
                <button onClick={() => {
                    history.push('/register')
                }} className="self-center px-6 py-2 rounded mr-2">{t('Sign up')}</button>
            </Fragment>
        }
        return <Fragment>
            <button onClick={() => {
                history.push('/profile')
            }} className="self-center px-6 py-2 rounded">{t('Hello')}! {userLogin.taiKhoan}</button>
            <button onClick={() => {
                localStorage.removeItem(USER_LOGIN)
                localStorage.removeItem(ACCESS_TOKEN)
                history.push('/home')
                window.location.reload()
            }} className='self-center px-2 py-2 rounded mr-3 text-orange-500'>{t('Log out')}</button>
        </Fragment>
    }

    return (
        // <header className="lg:p-2 bg-coolGray-100 bg-opacity-50 bg-black text-white fixed w-full z-50">
        <nav className="lg:p-4 flex justify-between bg-coolGray-100 bg-opacity-50 bg-black text-white h-16 mx-auto fixed w-full z-50">
            <NavLink to="/" aria-label="Back to homepage" className="flex items-center lg:p-2">
                <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="" />
            </NavLink>
            <ul className={(showNav ? "left-0 " : "left-full ") + "lg:static fixed bottom-0 top-16 lg:flex lg:space-x-7 lg:bg-transparent bg-gray-500 bg-opacity-90 lg:w-auto w-full justify-between h-full lg:text-gray-500 text-white text-lg lg:text-[14px] lg:space-y-0 space-y-4 pt-3 lg:pt-[0!important]"}>

                <li className="flex justify-center">
                    <NavLink to="/home" className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-white" activeClassName='border-b-1 border-white'>{t('Home')}</NavLink>
                </li>
                <li className="flex justify-center">
                    <NavLink to="/contact" className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-white" activeClassName='border-b-1 border-white'>{t('Contact')}</NavLink>
                </li>
                <li className="flex justify-center ">
                    <NavLink to="/news" className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-white" activeClassName='border-b-1 border-white'>{t('News')}</NavLink>
                </li>
                <div className="items-center justify-center flex lg:hidden flex-shrink-0 text-center">
                    {renderLogin()}
                    {/* <Select defaultValue={localStorage.getItem('i18nextLng')} style={{ width: 100 }} onChange={handleChange} placeholder='Lang'>
                        <Option value="en"><i className="fas fa-flag-usa text-blue-500 mr-2"></i>Eng</Option>
                        <Option value="vi"><i className="fas fa-star text-red-500 mr-2"></i>Vie</Option>
                    </Select> */}
                    <Select defaultValue={localStorage.getItem('i18nextLng')} style={{ width: 70 }} options={[{ label: 'Eng', value: 'en' }, { label: 'Vie', value: 'vi' }]} onChange={handleChange} />
                </div>
            </ul>
            <div className="items-center justify-center hidden flex-shrink-0 lg:flex text-center">
                {renderLogin()}
                {/* <Select defaultValue={localStorage.getItem('i18nextLng')} style={{ width: 100 }} onChange={handleChange} placeholder='Lang'>
                        <Option value="en"><i className="fas fa-flag-usa text-blue-500 mr-2"></i>Eng</Option>
                        <Option value="vi"><i className="fas fa-star text-red-500 mr-2"></i>Vie</Option>
                    </Select> */}
                <Select defaultValue={localStorage.getItem('i18nextLng')} style={{ width: 70 }} options={[{ label: 'Eng', value: 'en' }, { label: 'Vie', value: 'vi' }]} onChange={handleChange} />
            </div>
            <button onClick={() => setShowNav(!showNav)} className="px-3 lg:hidden ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-coolGray-800">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />

                </svg>
            </button>
        </nav>

        // </header>
    )
}
