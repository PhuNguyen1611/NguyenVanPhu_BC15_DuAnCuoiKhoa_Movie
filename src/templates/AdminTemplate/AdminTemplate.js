import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';
import { DesktopOutlined, FileOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { history } from "../../App";
import { ACCESS_TOKEN, USER_LOGIN } from "../../util/setting";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminTemplate = (props) => { //path, exact, Component

    const { Component, ...restProps } = props;
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    // if (!localStorage.getItem(USER_LOGIN)) {
    //     alert('Bạn không có quyền truy cập vào trang này !')
    //     return <Redirect to='/' />
    // }

    // if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
    //     alert('Bạn không có quyền truy cập vào trang này !')
    //     return <Redirect to='/' />
    // }

    const operations = <Fragment>
        {!_.isEmpty(userLogin) ? <Fragment> <button onClick={() => {
            history.push('/profile')
        }}> <NavLink to='/' style={{ width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="text-2xl ml-5 rounded-full bg-red-200">{userLogin.taiKhoan.substr(0, 1)}</NavLink></button>
            <button onClick={() => {
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(ACCESS_TOKEN);
                history.push('/');
                window.location.reload();
            }} className="btn btn-link text-blue-800 mr-5 ml-3">Đăng xuất</button> </Fragment> : ''}
    </Fragment>

    return <Route {...restProps} render={(propsRoute) => { //props.location,props.history,props.match

        return <Fragment>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo p-3">
                        <NavLink to='/'><img style={{ width: '100%', height: "100%" }} src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="..." /></NavLink>
                    </div>
                    <Menu theme="dark" mode="inline">
                        <SubMenu key="sub1" icon={<UserOutlined />} title="Users">
                            <Menu.Item key="1" icon={<UserOutlined />}>
                                <NavLink to='/admin/users'><div>Users</div></NavLink>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<UserOutlined />}>
                                <NavLink to='/admin/users/adduser'><div>Add User</div></NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<FileOutlined />} title="Films">
                            <Menu.Item key="3" icon={<FileOutlined />}>
                                <NavLink to='/admin/films'><div>Films</div></NavLink>
                            </Menu.Item>
                            <Menu.Item key="4" icon={<FileOutlined />}>
                                <NavLink to='/admin/films/addnew'><div>Add new</div></NavLink>
                            </Menu.Item>
                            <Menu.Item key="5" icon={<DesktopOutlined />}>
                                <NavLink to='/admin/films/' onClick={() => {
                                    alert('Vui lòng chọn phim và click vào biểu tượng tạo lịch chiếu!');
                                }}><div>Showtime</div></NavLink>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} >
                        <div className="text-right bg-white">{operations}</div>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: '85vh' }}>
                            <Component {...propsRoute} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </Fragment>
    }} />
}

export default AdminTemplate;