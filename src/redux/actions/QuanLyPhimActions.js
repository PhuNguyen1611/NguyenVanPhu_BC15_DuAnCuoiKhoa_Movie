import { history } from "../../App"
import { quanLyPhimServices } from "../../services/QuanLyPhimServices"
import { GET_DANH_SACH_PHIM, GET_THONG_TIN_PHIM } from "../types/QuanLyPhimType"
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction"

export const layDanhSachPhimAction = (tenPhim = '') => {
    return async (dispatch) => {
        try {
            if (tenPhim === '') {
                dispatch(displayLoadingAction)
                const result = await quanLyPhimServices.layDanhSachPhim(tenPhim)
                // console.log('result', result)
                await dispatch({
                    type: GET_DANH_SACH_PHIM,
                    arrPhim: result.data.content
                })
                dispatch(hideLoadingAction)
            } else {
                const result = await quanLyPhimServices.layDanhSachPhim(tenPhim)
                // console.log('result', result)
                await dispatch({
                    type: GET_DANH_SACH_PHIM,
                    arrPhim: result.data.content
                })
            }
        } catch (errors) {
            console.log('error', errors)
        }
    }
}

export const themPhimUploadHinhAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimServices.themPhimUploadHinh(formData)
            alert('Thêm phim thành công')
            // console.log('result', result)
            history.push('/admin/films')
        } catch (errors) {
            console.log('error', errors)
        }
    }
}

export const layThongTinPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimServices.layThongTinPhim(maPhim)
            // console.log('result', result.data.content)
            dispatch({
                type: GET_THONG_TIN_PHIM,
                thongTinPhim: result.data.content
            })
        } catch (errors) {
            console.log('error', errors)
        }
    }
}

export const capNhatPhimUploadAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimServices.capNhatPhimUpload(formData)
            alert('Cập nhật phim thành công')
            // console.log('result', result)
            dispatch(layDanhSachPhimAction())
            history.push('/admin/films')
        } catch (errors) {
            console.log('error', errors)
        }
    }
}

export const xoaPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimServices.xoaPhim(maPhim)
            // console.log('xoaphim', result)
            alert('Xóa phim thành công')
            dispatch(layDanhSachPhimAction())
        } catch (errors) {
            console.log('error', errors.response?.data)
        }
    }
}