import { quanLyRapServices } from "../../services/QuanLyRapServices"
import { GET_CHI_TIET_PHIM, GET_HE_THONG_RAP_CHIEU } from "../types/QuanLyRapType";

export const layDanhSachHeThongRapAction = () => {
    return async dispatch => {
        try {
            const result = await quanLyRapServices.layDanhSachHeThongRap();
            // console.log('result', result.data.content)
            if (result.status === 200) {
                dispatch({
                    type: GET_HE_THONG_RAP_CHIEU,
                    heThongRapChieu: result.data.content
                })
            }
        } catch (errors) {
            console.log('errors', errors.respose?.data)
        }
    }
}

export const layThongTinChiTietPhim = (id) => {
    return async dispatch => {
        try {
            const result = await quanLyRapServices.layThongTinLichChieuPhim(id);
            // console.log('result', result.data.content)
            dispatch({
                type: GET_CHI_TIET_PHIM,
                phimDetail: result.data.content
            })
        } catch (errors) {
            console.log('errors', errors.respose?.data)
        }
    }
}