import { Button, Input, Table } from 'antd';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { history } from '../../../App';
import { layDanhSachNguoiDungAction, xoaNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { USER_LOGIN } from '../../../util/setting';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

export default function Users(props) {
    const { userLogin, danhSachNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch()

    const { Search } = Input;
    const onSearch = value => {
        console.log(value)
        dispatch(layDanhSachNguoiDungAction(value))
    };

    useEffect(() => {
        dispatch(layDanhSachNguoiDungAction())
    }, [])

    if (!localStorage.getItem(USER_LOGIN)) {
        alert('Bạn không có quyền truy cập vào trang này !')
        return <Redirect to='/' />
    }

    if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
        alert('Bạn không có quyền truy cập vào trang này !')
        return <Redirect to='/' />
    }

    const columns = [
        {
            title: 'Tài Khoản',
            dataIndex: 'taiKhoan',
            sorter: (a, b) => a.taiKhoan - b.taiKhoan,
            sortDirections: ['descend', 'ascend'],
            width: '15%'
        },
        {
            title: 'Mật Khẩu',
            dataIndex: 'matKhau',
            width: '15%'
        },
        {
            title: 'Họ Tên',
            dataIndex: 'hoTen',
            sorter: (a, b) => {
                var hoTenA = a.hoTen.toLowerCase(), hoTenB = b.hoTen.toLowerCase();
                if (hoTenA < hoTenB)
                    return -1;
                if (hoTenA > hoTenB)
                    return 1;
                return 0;
            },
            sortDirections: ['descend', 'ascend'],
            width: '15%'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => {
                var emailA = a.email.toLowerCase(), emailB = b.email.toLowerCase();
                if (emailA < emailB)
                    return -1;
                if (emailA > emailB)
                    return 1;
                return 0;
            },
            sortDirections: ['descend', 'ascend'],
            width: '20%'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDt',
            sorter: (a, b) => a.soDt - b.soDt,
            sortDirections: ['descend', 'ascend'],
            width: '13%'
        },
        {
            title: 'Phân loại',
            dataIndex: 'maLoaiNguoiDung',
            sorter: (a, b) => {
                var maLoaiNguoiDungA = a.maLoaiNguoiDung.toLowerCase(), maLoaiNguoiDungB = b.maLoaiNguoiDung.toLowerCase();
                if (maLoaiNguoiDungA < maLoaiNguoiDungB)
                    return -1;
                if (maLoaiNguoiDungA > maLoaiNguoiDungB)
                    return 1;
                return 0;
            },
            sortDirections: ['descend', 'ascend'],
            width: '12%'
        },
        {
            title: '',
            dataIndex: 'hanhDong',
            render: (text, tk) => {
                return <Fragment>
                    <NavLink to={`/admin/users/edituser/${tk.taiKhoan}`} className='mx-2 text-xl'><EditOutlined style={{ color: 'blue' }} /></NavLink>
                    <span onClick={() => {
                        if (window.confirm('Bạn muốn xóa tài khoản: ' + tk.taiKhoan)) {
                            dispatch(xoaNguoiDungAction(tk.taiKhoan))
                        }
                    }} className='ml-2 text-lg cursor-pointer'><DeleteOutlined style={{ color: 'red' }} /></span>
                </Fragment>
            },
            width: '10%'
        },
    ];

    const data = danhSachNguoiDung;
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    console.log(danhSachNguoiDung)
    return <div className='container'>
        <h3 className='text-2xl mb-4'>Quản lý người dùng</h3>
        <Button onClick={() => {
            history.push('/admin/users/adduser')
        }}>Thêm người dùng</Button>
        <Search className='my-3' placeholder="input search text" allowClear onSearch={onSearch} enterButton />
        <Table columns={columns} dataSource={data} onChange={onChange} rowKey="taiKhoan" />
    </div>;
}
