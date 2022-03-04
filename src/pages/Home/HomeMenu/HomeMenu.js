import React, { Fragment, useState } from 'react'
import { Tabs, Radio, Space } from 'antd';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

const { TabPane } = Tabs;

const HomeMenu = React.memo(props => {

    const [state, setState] = useState({
        tabPosition: 'left',
    })

    const { tabPosition } = state;

    console.log('propsHomeMenu', props)

    const renderHeThongRap = () => {
        return props.heThongRapChieu?.map((heThongRap, index) => {
            return <TabPane tab={<img src={heThongRap.logo} className='w-[30px] md:w-[50px]' />} key={index}>
                <Tabs tabPosition={tabPosition}>
                    {heThongRap.lstCumRap?.slice(0, 10).map((cumRap, index) => {
                        return <TabPane tab={
                            <div className='w-[100px] sm:w-[150px] md:w-[200px] lg:w-[270px] xl:w-[350px]' style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={cumRap.hinhAnh} className='w-[35px] md:w-[50px] h-[35px] md:h-[50px]' alt={cumRap.tenCumRap} />
                                <div className='text-left ml-2' style={{ color: 'white' }}>
                                    <p className='mb-0 py-1 hover:text-sky-500 text-wrap'>{cumRap.tenCumRap}</p>
                                </div>
                            </div>
                        }
                            key={index} >

                            {/*Load phim tuong ung */}
                            {cumRap.danhSachPhim.slice(0, 5).map((phim, index) => {
                                return <Fragment key={index} >
                                    <div className='mb-2'>
                                        <div style={{ display: 'flex' }}>
                                            <img className='w-[35px] md:w-[60px] h-[50px] md:h-[80px]' src={phim.hinhAnh} alt={phim.tenPhim} onError={(e) => (e.target.onerror = null, e.target.src = 'https://picsum.photos/68/80')} />
                                            <div className='ml-1 md:ml-[10px!important] text-wrap break-all'>
                                                <h1 className='text-lg md:text-2xl text-white'>{phim.tenPhim}</h1>
                                                <p className='text-md md:text-lg text-white mb-0'>{cumRap.diaChi}</p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
                                            <img className='w-[35px] md:w-[60px] h-[35px] md:h-[60px] mt-1' src="https://cdn-icons-png.flaticon.com/512/1666/1666756.png" alt="" />
                                            <div className='grid grid-cols-5 gap-1'>
                                                {phim.lstLichChieuTheoPhim?.slice(0, 10).map((lichChieu, index) => {
                                                    return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className='ml-1 md:ml-[10px!important] text-[10px] sm:text-[12px] md:text-[14px] mt-2 text-sky-200 hover:text-sky-500 text-wrap break-all'>
                                                        {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                    </NavLink>
                                                })}
                                            </div>

                                        </div>
                                    </div>
                                    <hr className='border-white mb-2 opacity-40' />
                                </Fragment>
                            })}
                        </TabPane>
                    })
                    }
                </Tabs >
            </TabPane >
        })
    }

    return (

        <div className='lg:container px-auto lg:px-[50px!important] xl:px-[130px!important]' style={{ padding: '50px 0' }}>
            <Tabs tabPosition={tabPosition}>
                {renderHeThongRap()}
            </Tabs>
        </div>
    )
})

export default HomeMenu;