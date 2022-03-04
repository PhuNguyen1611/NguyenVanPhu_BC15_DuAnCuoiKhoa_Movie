import { useEffect } from "react";
import { history } from "../../App";
import { quanLyNguoiDungServices } from "../../services/QuanLyNguoiDungServices"
import { CAP_NHAT_ACTION, DANG_KY_ACTION, DANG_NHAP_ACTION, LAY_DANH_SACH_LOAI_NGUOI_DUNG_ACTION, LAY_DANH_SACH_NGUOI_DUNG_ACTION, LAY_THONG_TIN_NGUOI_DUNG_ACTION, LAY_THONG_TIN_TAI_KHOAN_ACTION } from "../types/QuanLyNguoiDungType";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";

export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungServices.dangNhap(thongTinDangNhap);
            if (result.data.statusCode === 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                })
                history.goBack()
            }
            // console.log('result', result);
        } catch (error) {
            console.log('error', error.response.data);
        }
    }
}

export const dangKyAction = (thongTinDangKy) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungServices.dangKy(thongTinDangKy);
            if (result.data.statusCode === 200) {
                alert('Success!')
                dispatch({
                    type: DANG_KY_ACTION,
                    thongTinDangKy: result.data.content
                })
                history.goBack()
            }
            // console.log('result', result);
        } catch (error) {
            console.log('error', error.response.data);
        }
    }
}

export const layThongTinTaiKhoanAction = () => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyNguoiDungServices.layThongTinTaiKhoan();
            if (result.data.statusCode === 200) {
                await dispatch({
                    type: LAY_THONG_TIN_TAI_KHOAN_ACTION,
                    thongTinTaiKhoan: result.data.content
                })
            }
            dispatch(hideLoadingAction)
            // console.log('result', result);
        } catch (error) {
            console.log('error', error.response?.data);
        }
    }
}

export const capNhatThongTinTaiKhoanAction = (thongTinCapNhat) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungServices.capNhatThongTinTaiKhoan(thongTinCapNhat);
            // console.log('result', result)
            if (result.data.statusCode === 200) {
                alert('Cập nhật thành công')
                await dispatch({
                    type: CAP_NHAT_ACTION,
                    thongTinCapNhat
                })
            }
            window.location.reload()
        } catch (error) {
            console.log('error', error.response.data);
        }
    }
}

export const layDanhSachNguoiDungAction = (tuKhoa = '') => {
    return async (dispatch) => {
        try {
            if (tuKhoa === '') {
                dispatch(displayLoadingAction)
                const result = await quanLyNguoiDungServices.layDanhSachNguoiDung(tuKhoa)
                // console.log('result', result)
                await dispatch({
                    type: LAY_DANH_SACH_NGUOI_DUNG_ACTION,
                    danhSachNguoiDung: result.data.content
                })
                dispatch(hideLoadingAction)
            } else {
                const result = await quanLyNguoiDungServices.layDanhSachNguoiDung(tuKhoa)
                // console.log('result', result)
                await dispatch({
                    type: LAY_DANH_SACH_NGUOI_DUNG_ACTION,
                    danhSachNguoiDung: result.data.content
                })
            }
        } catch (errors) {
            console.log('error', errors)
        }
    }
}

export const layDanhSachLoaiNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungServices.layDanhSachLoaiNguoiDung();
            if (result.data.statusCode === 200) {
                dispatch({
                    type: LAY_DANH_SACH_LOAI_NGUOI_DUNG_ACTION,
                    loaiNguoiDung: result.data.content
                })
            }
            // console.log('result', result);
        } catch (error) {
            console.log('error', error.response.data);
        }
    }
}

export const themNguoiDungAction = (thongTinDangKy) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungServices.themNguoiDung(thongTinDangKy);
            if (result.data.statusCode === 200) {
                alert('Success!')
            }
            // console.log('result', result);
        } catch (error) {
            console.log('error', error.response.data);
        }
    }
}

export const xoaNguoiDungAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungServices.xoaNguoiDung(taiKhoan);
            if (result.data.statusCode === 200) {
                alert('Success!')
                dispatch(layDanhSachNguoiDungAction())
            }
            // console.log('result', result);
        } catch (error) {
            console.log('error', error.response.data);
        }
    }
}

export const layThongTinNguoiDungAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungServices.layThongTinNguoiDung(taiKhoan);
            if (result.data.statusCode === 200) {
                await dispatch({
                    type: LAY_THONG_TIN_NGUOI_DUNG_ACTION,
                    thongTinNguoiDung: result.data.content
                })
            }
            // console.log('result', result);
        } catch (error) {
            console.log('error', error.response?.data);
        }
    }
}

export const capNhatThongTinNguoiDungAction = (thongTinCapNhat) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungServices.capNhatThongTinNguoiDung(thongTinCapNhat);
            // console.log('result', result)
            if (result.data.statusCode === 200) {
                alert('Cập nhật thành công')
                history.push('/admin/users')
            }
        } catch (error) {
            console.log('error', error.response.data);
        }
    }
}