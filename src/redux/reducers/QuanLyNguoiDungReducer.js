import { ACCESS_TOKEN, USER_LOGIN } from "../../util/setting";
import { CAP_NHAT_ACTION, DANG_NHAP_ACTION, LAY_DANH_SACH_LOAI_NGUOI_DUNG_ACTION, LAY_DANH_SACH_NGUOI_DUNG_ACTION, LAY_THONG_TIN_NGUOI_DUNG_ACTION, LAY_THONG_TIN_TAI_KHOAN_ACTION } from "../types/QuanLyNguoiDungType"

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const stateDefault = {
    userLogin: user,
    thongTinTaiKhoan: {},
    danhSachNguoiDung: [],
    loaiNguoiDung: [],
    thongTinNguoiDung: {}
}

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case DANG_NHAP_ACTION: {
            const { thongTinDangNhap } = action;
            localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
            localStorage.setItem(ACCESS_TOKEN, thongTinDangNhap.accessToken)
            return { ...state, userLogin: thongTinDangNhap }
        }
        case LAY_THONG_TIN_TAI_KHOAN_ACTION: {
            state.thongTinTaiKhoan = action.thongTinTaiKhoan
            return { ...state }
        }
        case CAP_NHAT_ACTION: {
            const { thongTinCapNhat } = action;
            localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinCapNhat));
            return { ...state, userLogin: thongTinCapNhat }
        }
        case LAY_DANH_SACH_NGUOI_DUNG_ACTION: {
            state.danhSachNguoiDung = action.danhSachNguoiDung
            return { ...state }
        }
        case LAY_DANH_SACH_LOAI_NGUOI_DUNG_ACTION: {
            state.loaiNguoiDung = action.loaiNguoiDung
            return { ...state }
        }
        case LAY_THONG_TIN_NGUOI_DUNG_ACTION: {
            state.thongTinNguoiDung = action.thongTinNguoiDung
            return { ...state }
        }
        default: return { ...state }
    }
}