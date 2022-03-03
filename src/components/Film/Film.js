import React from 'react'
import { NavLink } from 'react-router-dom'
import { history } from '../../App'
import './Film.css'

export default function Film(props) {

    const { phim } = props

    return (
        // <NavLink to={`/detail/${phim.maPhim}`} className="wrapper">
        <div className="card" onClick={() => { history.push(`/detail/${phim.maPhim}`) }}>
            <img src={phim.hinhAnh} alt={phim.tenPhim} />
            <div className="descriptions">
                <h1 className='h-18'>{phim.tenPhim}</h1>
                <p className="leading-relaxed text-gray-900 h-12">{phim.moTa.length > 200 ? <span>{phim.moTa.slice(0, 200)} ...</span> : <span>{phim.moTa}</span>}</p>
                <a href={phim.trailer} target="_blank" rel="noopener noreferrer"><button className='play'>
                    <i className="fab fa-youtube mr-2" />
                    Play trailer on YouTube
                </button>
                </a>
                <button className='book'>
                    <i className="fas fa-shopping-cart mr-2"></i>
                    Book Now
                </button>

            </div>
        </div>
        // </NavLink>

        // Nếu ko sử dụng NavLink có thể sử dụng onClick thêm vào thẻ div
        // import {history} from '../../App.js'
        // onClick={()=>{history.push(`/detail/${phim.maPhim}`)}}
    )
}
