import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { USER_LOGIN } from '../../../util/setting';
import { Table, Input, Button } from 'antd';
import { layDanhSachPhimAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimActions';
import { EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons'
import { history } from '../../../App';

export default function Films(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { arrPhimDefault } = useSelector(state => state.QuanLyPhimReducer)
    const dispatch = useDispatch()

    const { Search } = Input;
    const onSearch = value => {
        console.log(value)
        dispatch(layDanhSachPhimAction(value))
    };

    useEffect(() => {
        dispatch(layDanhSachPhimAction())
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
            title: 'Mã phim',
            dataIndex: 'maPhim',
            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirections: ['descend', 'ascend'],
            width: '13%'
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            render: (text, film, index) => {
                return <Fragment>
                    <img style={{ width: 40, height: 50 }} src={film.hinhAnh} alt={film.tenPhim} onError={(e) => {
                        e.target.onError = null;
                        e.target.src = `https://picsum.photos/id/${index}/50/70`
                    }} />
                </Fragment>
            },
            width: '12%'
        },
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            sorter: (a, b) => {
                var tenPhimA = a.tenPhim.toLowerCase(), tenPhimB = b.tenPhim.toLowerCase();
                if (tenPhimA < tenPhimB)
                    return -1;
                if (tenPhimA > tenPhimB)
                    return 1;
                return 0;
            },
            sortDirections: ['descend', 'ascend'],
            width: '25%'
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            render: (text, film) => {
                return <Fragment>
                    {film.moTa.length > 70 ? film.moTa.substr(0, 70) + ' ...' : film.moTa}
                </Fragment>
            },
            width: '35%'
        },
        {
            title: '',
            dataIndex: 'hanhDong',
            render: (text, film) => {
                return <Fragment>
                    <NavLink to={`/admin/films/edit/${film.maPhim}`} className='mx-2 text-xl'><EditOutlined style={{ color: 'blue' }} /></NavLink>
                    <NavLink to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`} onClick={() => {
                        localStorage.setItem('filmParams', JSON.stringify(film))
                    }} className='mx-2 text-xl'><CalendarOutlined style={{ color: 'green' }} /></NavLink>
                    <span onClick={() => {
                        if (window.confirm('Bạn muốn xóa phim ' + film.tenPhim)) {
                            dispatch(xoaPhimAction(film.maPhim))
                        }
                    }} className='ml-2 text-lg cursor-pointer'><DeleteOutlined style={{ color: 'red' }} /></span>
                </Fragment>
            },
            width: '25%'
        },
    ];

    const data = arrPhimDefault
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    return <div className='container'>
        <h3 className='text-2xl mb-4'>Quản lý phim</h3>
        <Button onClick={() => {
            history.push('/admin/films/addnew')
        }} className='bg-white'>Thêm phim</Button>
        <Search className='my-3' placeholder="input search text" allowClear onSearch={onSearch} enterButton />
        <Table columns={columns} dataSource={data} onChange={onChange} rowKey="maPhim" />
    </div >;
}
